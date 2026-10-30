import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import categoryRouter from "./routes/category.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import transactionRouter from "./routes/transaction.routes.js";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());
app.use("/category", categoryRouter);
app.use("/transaction", transactionRouter);
app.use(errorMiddleware);
app.get("/", async (req, res) => {
    res.send("Api is Live!");
});
if (process.env.NODE_ENV === "development") {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
export default app;
//# sourceMappingURL=index.js.map