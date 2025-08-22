import React, { useMemo, useState } from "react";
import { MdHome } from "react-icons/md";
import { PiBrowserDuotone } from "react-icons/pi";
import { FaGamepad, FaRegComment, FaStar, FaUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";


const LINKS = [
  { label: "Home", href: "/", icon: <MdHome /> },
  { label: "Devlogs", href: "/devlogs", icon: <PiBrowserDuotone /> },
  { label: "Jams", href: "/game-james", icon: <FaStar /> },
  { label: "Browse", href: "/browse", icon: <FaBars /> },
];

// --- mock data (keep yours) ---
const TAGS = [
  "Major Update",
  "Bugfix",
  "UI/UX",
  "Localization",
  "Patch Notes",
  "Optimization",
  "Multiplayer",
  "Early Access",
  "Dev Diary",
  "Art & Audio",
];


const DEVLOGS = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title:
    i % 4 === 0
      ? "Gravity Storm is Almost Finished"
      : i % 3 === 0
      ? "Happy 8th Anniversary to Battle Line"
      : i % 2 === 0
      ? "Blank_0.1 is out now on Steam"
      : "Pink Skyline Environment v1.14",
  game: i % 2 === 0 ? "RogueLike" : "Puzzlemania",
  cover:
    i % 3 === 0
      ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  tags: [TAGS[i % TAGS.length], TAGS[(i + 4) % TAGS.length]],
  likes: Math.floor(Math.random() * 120),
  comments: Math.floor(Math.random() * 40),
  minutes: 1 + (i % 6),
  date: "1d",
}));

function cx(...x) {
  return x.filter(Boolean).join(" ");
}

const DevlogCard = ({ item }) => (
  <a href={`/devlog/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
    <article className="group rounded-xl overflow-hidden bg-zinc-800 ring-1 ring-zinc-700 hover:ring-zinc-500 transition-all">
    <div className="aspect-[16/9] overflow-hidden bg-zinc-700">
      <img
        src={item.cover}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
    <div className="p-4">
      <div className="mb-1 flex items-center gap-2 text-xs text-zinc-400">
        <span className="inline-flex items-center rounded bg-zinc-700/60 px-2 py-0.5">
          {item.game}
        </span>
        <span>•</span>
        <span>{item.minutes} min read</span>
        <span>•</span>
        <span>{item.date} ago</span>
      </div>
      <h3 className="line-clamp-2 font-semibold text-zinc-100">{item.title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <IoHeartOutline size={16} />
            {item.likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <FaRegComment />
            {item.comments}
          </span>
        </div>
        <a href="/devlogs/some-slug" className="text-zinc-300 hover:text-white">
          Read
        </a>
      </div>
    </div>
  </article>

  </a>
);

const FilterBlock = ({ title, children }) => (
  <div>
    <p className="mb-2 text-sm font-medium tracking-wide text-zinc-300">
      {title}
    </p>
    {children}
  </div>
);

export default function DevLogs() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("New & popular");
  const [selected, setSelected] = useState(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (v) =>
    setSelected((p) => {
      const n = new Set(p);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });

  const list = useMemo(() => {
    let l = [...DEVLOGS];
    if (search) {
      const q = search.toLowerCase();
      l = l.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.game.toLowerCase().includes(q) ||
          x.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selected.size) {
      l = l.filter(
        (x) => x.tags.some((t) => selected.has(t)) || selected.has(x.game)
      );
    }
    if (sort === "Most recent") l = l.reverse();
    if (sort === "Most popular")
      l = l.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    return l;
  }, [search, selected, sort]);

  const SortTabs = () => {
    const tabs = ["New & popular", "Most recent", "Most popular"];
    return (
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setSort(t)}
            className={cx(
              "rounded-full px-3 py-1 text-sm transition",
              sort === t
                ? "bg-zinc-200 text-zinc-900"
                : "bg-zinc-800 ring-1 ring-zinc-700 text-zinc-300 hover:ring-zinc-500"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-zinc-900 text-zinc-100">
      {/* TWO-COLUMN LAYOUT: left fixed, right scrollable */}
      <div className="h-screen w-full overflow-hidden lg:grid lg:grid-cols-[300px_1fr]">
        {/* LEFT: Brand + Primary Nav + Filters (fixed) */}
        <aside className="hidden lg:flex flex-col border-r border-zinc-800 bg-zinc-900 px-4 py-5">
          {/* Brand + Primary nav (no scroll) */}
          <div className="pb-5">
            <a href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-white" />
              <span className="text-lg font-semibold">GameHub</span>
            </a>
            <nav className="space-y-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 rounded px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  {l.icon}
                  <span>{l.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-3 h-px bg-zinc-800" />

          {/* Filters (still non-scroll for strict parity) */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Filter posts
              </h2>
              <p className="text-xs text-zinc-500">
                This rail stays fixed; only the right list scrolls.
              </p>
            </div>

            <FilterBlock title="Tags">
              <div className="flex flex-wrap gap-2">
                {TAGS.map((opt) => {
                  const active = selected.has(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggle(opt)}
                      className={cx(
                        "rounded-full border px-3 py-1 text-xs transition",
                        active
                          ? "border-zinc-200 bg-zinc-200 text-zinc-900"
                          : "border-zinc-600 text-zinc-300 hover:border-zinc-400"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </FilterBlock>

            <button
              onClick={() => setSelected(new Set())}
              className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300 ring-1 ring-zinc-700 hover:ring-zinc-500"
            >
              Clear all
            </button>
          </div>
        </aside>

        {/* RIGHT: Scrollable content area */}
        <main className="h-full overflow-y-auto">
          {/* Sticky local header */}
          <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left section: menu + title + sort */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Mobile open filters */}
                  <button
                    className="lg:hidden rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    Menu
                  </button>
                  <div className="text-sm text-zinc-400">Developer Logs</div>
                  <SortTabs />
                </div>

                {/* Right section: search + new button */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-auto">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search games, tags, creators…"
                      className="w-full sm:w-64 rounded-lg bg-zinc-800 px-3 py-2 pl-9 text-sm text-zinc-100 placeholder-zinc-400 ring-1 ring-zinc-700 focus:outline-none focus:ring-zinc-500"
                    />
                    <FaGamepad className="absolute left-2.5 top-2.5 text-zinc-400" />
                  </div>
                  <a
                    href="/devlog/new"
                    className="w-full sm:w-auto rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 text-center"
                  >
                    + New Devlog
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grid list */}
          <div className="mx-auto max-w-7xl px-4 py-6">
            <p className="mb-4 text-sm text-zinc-400">
              Showing <span className="text-zinc-200">{list.length}</span> posts
              {selected.size > 0 && (
                <>
                  {" "}
                  • Filters:{" "}
                  {[...selected].map((f) => (
                    <span
                      key={f}
                      className="mr-1 inline-flex items-center rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300"
                    >
                      {f}
                    </span>
                  ))}
                </>
              )}
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((item) => (
                <DevlogCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center">
              <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500">
                Next page →
              </button>
            </div>
            <div className="h-6" />
          </div>
        </main>
      </div>

      {/* MOBILE: bottom nav */}
      <nav className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[94%] max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/90 px-2 py-2 shadow-2xl backdrop-blur md:hidden">
        <ul className="flex items-center justify-around text-xs text-zinc-300">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex flex-col items-center gap-1 rounded px-3 py-1.5 hover:bg-zinc-800"
              >
                {l.icon}
                <span>{l.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="/profile"
              className="flex flex-col items-center gap-1 rounded px-3 py-1.5 hover:bg-zinc-800"
            >
              <FaUser />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* MOBILE: slide-over for filters + primary nav (Menu button toggles; you can add state) */}
      {mobileFiltersOpen && (
        <div
          onClick={() => setMobileFiltersOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] transform bg-zinc-900 p-4 shadow-2xl transition"
          >
            <div className="mb-4">
              <a href="/" className="inline-flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-white" />
                <span className="text-lg font-semibold">GameHub</span>
              </a>
            </div>
            <nav className="mb-4 space-y-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 rounded px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  {l.icon}
                  <span>{l.label}</span>
                </a>
              ))}
            </nav>
            <div className="my-3 h-px bg-zinc-800" />
            <FilterBlock title="Tags">
              <div className="flex flex-wrap gap-2">
                {TAGS.map((opt) => {
                  const active = selected.has(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggle(opt)}
                      className={cx(
                        "rounded-full border px-3 py-1 text-xs transition",
                        active
                          ? "border-zinc-200 bg-zinc-200 text-zinc-900"
                          : "border-zinc-600 text-zinc-300 hover:border-zinc-400"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </FilterBlock>
            <button
              onClick={() => setSelected(new Set())}
              className="mt-4 w-full rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300 ring-1 ring-zinc-700 hover:ring-zinc-500"
            >
              Clear all
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
