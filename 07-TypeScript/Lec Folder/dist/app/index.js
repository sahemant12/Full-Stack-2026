import express from "express";
import { register as registerHealthRoutes } from "./routes/health/routes.js";
export function createApp() {
    const app = express();
    app.use("/health", registerHealthRoutes());
    return app;
}
//# sourceMappingURL=index.js.map