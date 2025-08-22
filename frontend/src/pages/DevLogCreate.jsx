import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
const API = import.meta.env.VITE_API_URL;

// helpers
const cx = (...x) => x.filter(Boolean).join(" ");
const debounce = (fn, ms = 600) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};
const wordCount = (s = "") => (s.trim().match(/\S+/g) || []).length;
const estimateMinutes = (s = "") => Math.max(1, Math.round(wordCount(s) / 200));

// ---- logger (put near helpers) ----
const logDevlogEvent = (phase, payload = {}) => {
  const meta = {
    phase, // 'save_draft' | 'autosave' | 'submit'
    at: new Date().toISOString(),
    ua: navigator.userAgent,
  };

  // ONE nice compact line you can copy from DevTools
  console.log("[DEVLOG]", JSON.stringify({ meta, data: payload }, null, 2));

  // (Optional) also fire a CustomEvent if you want to capture logs elsewhere
  // window.dispatchEvent(new CustomEvent("devlog:log", { detail: { meta, data: payload }}));
};

// --- Tag input component ---
function TagInput({ value, onChange, max = 10 }) {
  const [draft, setDraft] = useState("");
  const add = (t) => {
    const tag = String(t).trim();
    if (!tag) return;
    if (value.includes(tag)) return;
    if (value.length >= max) return;
    onChange([...value, tag]);
    setDraft("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-2">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-600 px-3 py-1 text-xs text-zinc-200"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== t))}
              className="text-zinc-400 hover:text-zinc-200"
              aria-label={`Remove tag ${t}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={value.length ? "" : "Add a tag and press Enter"}
          className="flex-1 bg-transparent px-2 py-1 text-sm text-zinc-100 placeholder-zinc-500 outline-none"
        />
      </div>
    </div>
  );
}

// --- Link rows ---
function LinksEditor({ value, onChange }) {
  const add = () => onChange([...(value || []), { label: "", url: "" }]);
  const update = (i, k, v) => {
    const next = value.slice();
    next[i] = { ...next[i], [k]: v };
    onChange(next);
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-3">
      {(value || []).map((row, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1.5fr_auto]">
          <input
            value={row.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Label (Steam, Discord, Ko-Fi)"
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
          />
          <input
            value={row.url}
            onChange={(e) => update(i, "url", e.target.value)}
            placeholder="https://example.com"
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded-md border border-zinc-700 px-3 text-sm text-zinc-300 hover:border-zinc-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-500"
      >
        + Add Link
      </button>
    </div>
  );
}

// --- Cover uploader (multer endpoint) ---
function CoverUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function uploadFiles(files) {
  setUploading(true);
  try {
    for (const f of files) {
      console.log("Uploading:", f.name, f.type, f.size);
      const fd = new FormData();
      fd.append("file", f);

      const res = await fetch(`${API}/api/uploads/image`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      // Inspect non-2xx for server message
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error("Upload failed:", res.status, errText);
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const json = await res.json();
      console.log("Upload response:", json);

      const { url } = json;
      if (!url) throw new Error("Upload response missing `url`");

      onChange(prev => ([...(prev || []), url]));
    }
  } finally {
    setUploading(false);
  }
}


  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={cx(
        "rounded-lg border border-dashed border-zinc-700 p-4",
        "bg-zinc-900 text-sm text-zinc-300"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 py-6">
        <p>Drag & drop images here (JPG/PNG/WebP/GIF) or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:border-zinc-500"
        >
          Browse files
        </button>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        {uploading && <p className="text-xs text-zinc-400">Uploading…</p>}
      </div>

      {!!value?.length && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((u, i) => (
            <div
              key={u + i}
              className="relative overflow-hidden rounded-md ring-1 ring-zinc-700"
            >
              <img
                src={u}
                alt={`cover-${i}`}
                className="h-28 w-full object-cover"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== u))}
                className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DevlogCreate() {


  // --- form state ---
  const [id, setId] = useState(null); // devlog id after first save
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [projectId, setProjectId] = useState(""); // optional
  const [tags, setTags] = useState([]);
  const [coverImages, setCoverImages] = useState([]);
  const [contentMd, setContentMd] = useState("");
  const [links, setLinks] = useState([]);
  const [download, setDownload] = useState({
    label: "",
    button: "",
    price: "",
  });
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const minutesRead = useMemo(() => estimateMinutes(contentMd), [contentMd]);

  const buildPayload = () => ({
    id, // include id if present
    title,
    subtitle,
    projectId: projectId || undefined,
    tags,
    coverImages,
    contentMd,
    links,
    download,
    metrics: { minutesRead },
  });

  // --- autosave after first manual save ---
  // --- autosave after first manual save ---
  const doSave = useCallback(
    async (opts = { phase: "save_draft" }) => {
      // phase: 'save_draft' | 'autosave'
      if (title.trim().length < 6) return; // minimal guard for autosave
      setSaving(true);
      try {
        const payload = buildPayload();

        logDevlogEvent(opts.phase ?? "save_draft", payload);
        console.log("Uploading to:", `${API}/api/uploads/image`);

        let res;
        if (!id) {
          res = await fetch(`${API}/api/devlogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
          });
          if (!res.ok) throw new Error("Create failed");
          const data = await res.json();
          setId(data.id);
        } else {
          res = await fetch(`${API}/api/devlogs/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Update failed");
        }
      } finally {
        setSaving(false);
      }
    },
    [
      id,
      title,
      subtitle,
      projectId,
      tags,
      coverImages,
      contentMd,
      links,
      download,
      minutesRead,
    ]
  );

  const debouncedSave = useRef(debounce(doSave, 800)).current;

  useEffect(() => {
    if (id) debouncedSave(); // autosave updates after first save
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    subtitle,
    projectId,
    tags,
    coverImages,
    contentMd,
    links,
    download,
  ]);

  const onManualSave = async () => {
    if (title.trim().length < 6) {
      alert("Title must be at least 6 characters.");
      return;
    }
    await doSave();
  };

  const onSubmitForReview = async () => {
    if (!id) {
      alert("Please save draft first.");
      return;
    }
    if (title.trim().length < 6 || contentMd.trim().length < 30) {
      alert("Add a proper title and content before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/devlogs/${id}/submit`, { method: "POST" });
      if (!res.ok) throw new Error("Submit failed");
      alert("Submitted for review!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-100">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-900/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">New Devlog</span>
              <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                {id ? "Draft saved" : "Unsaved draft"}
              </span>
              <span className="text-xs text-zinc-500">
                • {minutesRead} min read
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onManualSave}
                disabled={saving}
                className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={onSubmitForReview}
                disabled={submitting}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit for Review"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="mx-auto max-w-6xl px-4 py-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* LEFT: main fields */}
        <section className="space-y-6">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Gravity Storm is Almost Finished"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-lg text-zinc-100 placeholder-zinc-500"
            />
            <p className="mt-1 text-xs text-zinc-500">Min 6 characters.</p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Subtitle</label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Gravity Storm – First Mission (Demo 3) • Devlog"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">
                Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
              >
                <option value="">Select a project (optional)</option>
                <option value="proj_1">Gravity Storm</option>
                <option value="proj_2">Puzzlemania</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Tags</label>
              <TagInput value={tags} onChange={setTags} max={10} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Cover Images
            </label>
            <CoverUploader value={coverImages} onChange={setCoverImages} />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm text-zinc-300">
                Devlog Content (Markdown)
              </label>
              <span className="text-xs text-zinc-500">
                {wordCount(contentMd)} words
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <textarea
                value={contentMd}
                onChange={(e) => setContentMd(e.target.value)}
                placeholder={`Write your progress, updates, challenges…\n\nSupport: **bold**, _italics_, lists, links, images (paste URLs)`}
                className="min-h-[280px] rounded-md border border-zinc-700 bg-zinc-900 p-3 text-sm text-zinc-100 placeholder-zinc-500"
              />
              <div className="min-h-[280px] rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm">
                <p className="mb-2 text-xs text-zinc-500">
                  Live preview (plain)
                </p>
                <pre className="whitespace-pre-wrap font-sans text-zinc-200">
                  {contentMd || "Nothing to preview yet…"}
                </pre>
              </div>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Read time auto-estimates at ~200 wpm. We’ll render markdown on the
              site view.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Links</label>
            <LinksEditor value={links} onChange={setLinks} />
          </div>
        </section>

        {/* RIGHT: sidebar blocks */}
        <aside className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">
              Download Section
            </h3>
            <div className="space-y-3">
              <input
                value={download.label}
                onChange={(e) =>
                  setDownload((d) => ({ ...d, label: e.target.value }))
                }
                placeholder="Get Gravity Storm – First Mission (Demo 3)"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
              />
              <input
                value={download.button}
                onChange={(e) =>
                  setDownload((d) => ({ ...d, button: e.target.value }))
                }
                placeholder="Download Now"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
              />
              <input
                value={download.price}
                onChange={(e) =>
                  setDownload((d) => ({ ...d, price: e.target.value }))
                }
                placeholder="Name your own price"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">
              Publishing
            </h3>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>
                • Save draft first; autosave kicks in after the first save.
              </li>
              <li>• Submit when content is ready. Admin will review.</li>
              <li>• You can attach up to 10 images.</li>
              <li>• Max 10 tags.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
