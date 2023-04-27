import { createTRPCRouter } from "~/server/api/trpc";
import { packageRouter } from "./routers/packages";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  package: packageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
