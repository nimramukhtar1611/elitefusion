import mongoose from 'mongoose'
const { Schema } = mongoose;

/** Lightweight slugify (no external dep) */
function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")               // drop quotes
    .replace(/[^a-z0-9]+/g, "-")        // non-alnum -> hyphen
    .replace(/^-+|-+$/g, "");           // trim hyphens
}


// Sub Section Schema For Devlog
const LinkSchema = new Schema(
  {
    label: { type: String, trim: true, required: true, maxlength: 120 },
    url:   { type: String, trim: true, required: true, maxlength: 2048 },
  },
  { _id: false }
);

const DownloadSchema = new Schema(
  {
    label:  { type: String, trim: true, maxlength: 160 },
    button: { type: String, trim: true, maxlength: 80 },
    price:  { type: String, trim: true, maxlength: 80 }, // free text like "Name your own price"
  },
  { _id: false }
);

const CommentSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body:     { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { _id: true, timestamps: { createdAt: true, updatedAt: false } }
);


// Main Devlog Schema
const DevlogSchema = new Schema(
  {
    // Identity
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug:  { type: String, required: true, unique: true, index: true },

    // Author / associations
    authorId:  { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Game" }, 

    // Content
    subtitle:             { type: String, trim: true, maxlength: 200 },
    contentMd:            { type: String, default: "" },             // authoring source
    contentHtmlSanitized: { type: String, default: "" },             // render-ready HTML

    // Media
    coverImages: [{ type: String, trim: true, maxlength: 2048 }],

    // Metadata displayed in sidebar
    statusLabel: { type: String, trim: true, maxlength: 60 },       // e.g., "In development"
    genre:       [{ type: String, trim: true, maxlength: 60 }],
    tags:        [{ type: String, trim: true, maxlength: 60, index: true }],
    languages:   [{ type: String, trim: true, maxlength: 60 }],
    accessibility: [{ type: String, trim: true, maxlength: 80 }],

    // Links / download
    links:    [LinkSchema],
    download: DownloadSchema,

    // Workflow
    state: {
      type: String,
      enum: ["DRAFT", "PENDING", "PUBLISHED", "REJECTED"],
      default: "DRAFT",
      index: true,
    },
    publishedAt: { type: Date, index: true },
    rejectNote:  { type: String, trim: true, maxlength: 500 },

    // Metrics
    metrics: {
      views:        { type: Number, default: 0 },
      likes:        { type: Number, default: 0 },
      comments:     { type: Number, default: 0 },
      minutesRead:  { type: Number, default: 1 }, // precomputed for UI
    },

    // Comments (basic embedded — you can also move to a separate collection later)
    comments: [CommentSchema],

    // Audit trail
    audit: [
      {
        action:   { type: String, trim: true, maxlength: 40 }, // CREATED, SUBMITTED, APPROVED, etc.
        byUserId: { type: Schema.Types.ObjectId, ref: "User" },
        note:     { type: String, trim: true, maxlength: 300 },
        at:       { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON:    { virtuals: true },
    toObject:  { virtuals: true },
  }
);

/** -------- Indexes -------- */
// Fast listing for public pages
DevlogSchema.index({ state: 1, publishedAt: -1 });
// Basic text search starter (upgrade to Atlas Search if needed)
DevlogSchema.index({ title: "text", contentHtmlSanitized: "text", tags: "text" }, { name: "devlog_text" });

/** -------- Hooks -------- */
// Generate/normalize slug from title if missing/changed.
// Ensures uniqueness by appending a short suffix on conflict.
DevlogSchema.pre("validate", async function ensureSlug(next) {
  if (!this.isModified("title") && this.slug) return next();
  const base = slugify(this.title || "");
  if (!base) return next(new Error("Title required to generate slug"));
  let candidate = base;
  let n = 0;

  while (await mongoose.models.Devlog.exists({ slug: candidate, _id: { $ne: this._id } })) {
    n += 1;
    candidate = `${base}-${n}`; // simple collision strategy; stable and SEO-friendly
  }
  this.slug = candidate;
  next();
});

// Auto-set publishedAt when moving to PUBLISHED
DevlogSchema.pre("save", function setPublishedAt(next) {
  if (this.isModified("state") && this.state === "PUBLISHED" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

/** -------- Statics / Methods -------- */
// Public getter used by detail page
DevlogSchema.statics.findPublicBySlug = function (slug) {
  return this.findOne({ slug, state: "PUBLISHED" })
    .select("-audit -comments.__v")
    .lean({ getters: true, virtuals: true });
};

// Convenience list (feed)
DevlogSchema.statics.listPublic = function ({ q, tags = [], page = 1, limit = 24, sort = "-publishedAt" }) {
  const filter = { state: "PUBLISHED" };
  if (q) filter.$text = { $search: q };
  if (tags.length) filter.tags = { $in: tags };

  return this.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .select("title slug coverImages tags metrics minutesRead publishedAt authorId")
    .lean();
};

const Devlog = mongoose.models.Devlog || mongoose.model("Devlog", DevlogSchema);

export default Devlog
