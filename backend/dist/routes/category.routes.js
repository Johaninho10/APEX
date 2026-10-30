import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
const categoryRouter = Router();
categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);
export default categoryRouter;
//# sourceMappingURL=category.routes.js.map