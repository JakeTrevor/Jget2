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

  // rest routes
  getByName: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/package/{name}/",
      },
    })
    .input(
      z.object({
        name: z.string(),
      })
    )
    .output(
      z.object({
        name: z.string(),
        files: z.string(),
      })
    )
    .query(({ ctx, input: { name } }) => {
      return ctx.prisma.package.findUniqueOrThrow({
        where: {
          name: name,
        },
        select: {
          name: true,
          files: true,
        },
      });
    }),

  upload: publicProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/package/{name}/",
      },
    })
    .input(
      z.object({
        name: z.string(),
        files: z.string(),
      })
    )
    .output(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.package.upsert({
        where: {
          name: input.name,
        },
        create: input,
        update: input,
        select: { name: true },
      });
    }),
});
