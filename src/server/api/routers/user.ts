import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserPackages: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input: { userID } }) => {
      const authorships = await ctx.prisma.author.findMany({
        select: { package: true },
        where: {
          userId: userID,
        },
      });

      return authorships.map((e) => e.package);
    }),
});
