
import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createDevlog, listPublic, getPublicBySlug, getById,
  updateDevlog, deleteDevlog, submitDevlog,
} from "../controllers/devlogController.js";
import validate from "../utils/validate.js";

const router = Router();

router.post(
  "/",
  [
    body("title").isString().trim().isLength({ min: 1, max: 160 }),
    body("authorId").optional().isMongoId(),
    body("projectId").optional({ nullable: true }).isMongoId(),
    body("subtitle").optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
    body("contentMd").optional().isString(),
    body("contentHtmlSanitized").optional().isString(),
    body("coverImages").optional().isArray(),
    body("statusLabel").optional().isString().trim().isLength({ max: 60 }),
    body("genre").optional().isArray(),
    body("tags").optional().isArray(),
    body("languages").optional().isArray(),
    body("accessibility").optional().isArray(),
    body("links").optional().isArray(),
    body("download").optional().isObject(),
    body("metrics").optional().isObject(),
    body("state").optional().isIn(["DRAFT","PENDING","PUBLISHED","REJECTED"]),
  ],
  validate,
  createDevlog
);

router.get(
  "/",
  [
    query("q").optional().isString().trim(),
    query("tags").optional().isString().trim(),
    query("page").optional().toInt().isInt({ min: 1 }),
    query("limit").optional().toInt().isInt({ min: 1, max: 100 }),
    query("sort").optional().isString().trim(),
  ],
  validate,
  listPublic
);

router.get("/slug/:slug", [param("slug").isString().trim()], validate, getPublicBySlug);
router.get("/:id", [param("id").isMongoId()], validate, getById);

router.patch(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().isString().trim().isLength({ min: 1, max: 160 }),
    body("projectId").optional({ nullable: true }).isMongoId(),
    body("subtitle").optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
    body("contentMd").optional().isString(),
    body("contentHtmlSanitized").optional().isString(),
    body("coverImages").optional().isArray(),
    body("statusLabel").optional().isString().trim().isLength({ max: 60 }),
    body("genre").optional().isArray(),
    body("tags").optional().isArray(),
    body("languages").optional().isArray(),
    body("accessibility").optional().isArray(),
    body("links").optional().isArray(),
    body("download").optional().isObject(),
    body("metrics").optional().isObject(),
    body("state").optional().isIn(["DRAFT","PENDING","PUBLISHED","REJECTED"]),
    body("publishedAt").optional().isISO8601().toDate(),
    body("rejectNote").optional().isString().trim().isLength({ max: 500 }),
  ],
  validate,
  updateDevlog
);

router.post("/:id/submit", [param("id").isMongoId()], validate, submitDevlog);
router.delete("/:id", [param("id").isMongoId()], validate, deleteDevlog);

export default router;
