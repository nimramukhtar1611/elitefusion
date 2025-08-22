import Devlog from "../models/Devlog.js";

/** CREATE */
export const createDevlog = async (req, res, next) => {
  try {
    const authorId = req.user?._id || req.body.authorId;
    console.log(authorId)
    if (!authorId) return res.status(400).json({ success: false, message: "authorId required" });

    const payload = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      authorId,
      projectId: req.body.projectId || undefined,
      tags: req.body.tags || [],
      coverImages: req.body.coverImages || [],
      contentMd: req.body.contentMd || "",
      contentHtmlSanitized: req.body.contentHtmlSanitized || "",
      links: req.body.links || [],
      download: req.body.download || undefined,
      metrics: req.body.metrics || { minutesRead: 1 },
      statusLabel: req.body.statusLabel,
      genre: req.body.genre || [],
      languages: req.body.languages || [],
      accessibility: req.body.accessibility || [],
      state: req.body.state || "DRAFT",
      publishedAt: req.body.publishedAt || undefined,
      rejectNote: req.body.rejectNote || undefined,
    };

    payload.audit = [{ action: "CREATED", byUserId: authorId, note: "Devlog created" }];

    const doc = await Devlog.create(payload);
    return res.status(201).json({ success: true, data: doc, id: doc._id.toString(), slug: doc.slug });
  } catch (err) {
    if (err?.code === 11000 && err.keyPattern?.slug) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    next(err);
  }
};

/** LIST (public) */
export const listPublic = async (req, res, next) => {
  try {
    const { q, tags, page = 1, limit = 24, sort = "-publishedAt" } = req.query;
    const tagsArr = typeof tags === "string" && tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
    const data = await Devlog.listPublic({ q, tags: tagsArr, page: Number(page), limit: Number(limit), sort });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

/** GET (public by slug) */
export const getPublicBySlug = async (req, res, next) => {
  try {
    const doc = await Devlog.findPublicBySlug(req.params.slug);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

/** GET (by id) */
export const getById = async (req, res, next) => {
  try {
    const doc = await Devlog.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

/** UPDATE */
export const updateDevlog = async (req, res, next) => {
  try {
    const devlog = await Devlog.findById(req.params.id);
    if (!devlog) return res.status(404).json({ success: false, message: "Not found" });

    const fields = [
      "title","subtitle","projectId","tags","coverImages","contentMd","contentHtmlSanitized",
      "links","download","metrics","statusLabel","genre","languages","accessibility",
      "state","publishedAt","rejectNote"
    ];
    fields.forEach(k => { if (req.body[k] !== undefined) devlog[k] = req.body[k]; });

    const prevState = devlog.state;
    if (req.body.state && req.body.state !== prevState) {
      devlog.audit.push({
        action: req.body.state === "PENDING" ? "SUBMITTED" :
                req.body.state === "PUBLISHED" ? "APPROVED" :
                req.body.state === "REJECTED" ? "REJECTED" : "UPDATED",
        byUserId: req.user?._id || devlog.authorId,
        note: `State changed ${prevState} -> ${req.body.state}`,
      });
    } else {
      devlog.audit.push({ action: "UPDATED", byUserId: req.user?._id || devlog.authorId, note: "Devlog updated" });
    }

    await devlog.save();
    res.json({ success: true, data: devlog });
  } catch (err) {
    if (err?.code === 11000 && err.keyPattern?.slug) {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    next(err);
  }
};

/** DELETE */
export const deleteDevlog = async (req, res, next) => {
  try {
    const doc = await Devlog.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) { next(err); }
};

/** SUBMIT => PENDING */
export const submitDevlog = async (req, res, next) => {
  try {
    const devlog = await Devlog.findById(req.params.id);
    if (!devlog) return res.status(404).json({ success: false, message: "Not found" });

    const prevState = devlog.state;
    devlog.state = "PENDING";
    devlog.audit.push({
      action: "SUBMITTED",
      byUserId: req.user?._id || devlog.authorId,
      note: `State changed ${prevState} -> PENDING`,
    });

    await devlog.save();
    res.json({ success: true, data: { id: devlog._id, state: devlog.state } });
  } catch (err) { next(err); }
};
