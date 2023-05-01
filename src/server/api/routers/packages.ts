import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const packageRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.package.count();
  }),

  getList: publicProcedure
    .input(
      z.object({
        search: z.optional(z.string()),
        page: z.number().min(1).default(1),
      })
    )
    .query(async ({ ctx, input: { search, page } }) => {
      const PAGE_SIZE = 10;

      let clause = search ? { name: { contains: search } } : {};

      return await ctx.prisma.package.findMany({
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        where: clause,
      });
    }),

  getFiles: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: name }) => {
      const data = await ctx.prisma.package.findUniqueOrThrow({
        where: { name },
        select: { files: true },
      });

      return JSON.parse(data.files) as Directory;
    }),
});
