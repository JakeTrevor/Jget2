import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const restRouter = createTRPCRouter({
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
