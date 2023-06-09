import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 10;

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
      let clause = search ? { name: { contains: search } } : {};

      let count = await ctx.prisma.package.count({ where: clause });

      let packages = await ctx.prisma.package.findMany({
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        where: clause,
      });

      return {
        num_pages: Math.ceil(count / PAGE_SIZE),
        packages,
      };
    }),

  getByName: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: name }) => {
      const temp = await ctx.prisma.package.findUniqueOrThrow({
        where: { name },
      });

      let data = {
        ...temp,
        files: JSON.parse(temp.files) as Directory,
      };

      return data;
    }),
});
