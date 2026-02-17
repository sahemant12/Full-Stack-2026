import http from "http";
import { env } from "./env.js";
import { logger } from "./logger.js";
import { createApp } from "./app/index.js";
async function main() {
    try {
        // const PORT: number = +(process.env.PORT ?? 8000);
        const PORT = +(env.PORT ?? 8000);
        const server = http.createServer(createApp()); // mount createApp to server
        server.listen(PORT, () => {
            logger.info(`server is running on PORT: ${PORT}`);
        });
    }
    catch (error) {
        logger.error(`Error starting server: `, error);
    }
}
main();
//# sourceMappingURL=index.js.map