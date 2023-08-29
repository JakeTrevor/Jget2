import { createTRPCRouter } from "~/server/api/trpc";
import { packageRouter } from "./routers/packages";
import { restRouter } from "./routers/rest";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  package: packageRouter,
  rest: restRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
