import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PAGE_SIZE = 5;

const directorySchema: z.ZodType<Directory> = z.lazy(() =>
  z.record(z.string().or(directorySchema))
);

export const packageRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.package.count();
  }),

  getList: publicProcedure
    .input(
      z.object({
        search: z.optional(z.string()),
        page: z.number().min(1).default(1),
        sorting: z
          .enum(["downloads", "name", "updatedAt"])
          .default("downloads"),
        order: z.enum(["asc", "desc"]).default("desc"),
      })
    )
    .query(
      async ({ ctx, input: { search, page, sorting: orderBy, order } }) => {
        let clause = search ? { name: { contains: search } } : {};

        let count = await ctx.prisma.package.count({ where: clause });

        let packages = await ctx.prisma.package.findMany({
          take: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
          where: clause,
          orderBy: { [orderBy]: order },
        });

        return {
          num_pages: Math.ceil(count / PAGE_SIZE),
          packages,
        };
      }
    ),

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

  updatePackage: publicProcedure
    .input(z.object({ name: z.string(), data: directorySchema }))
    .mutation(async ({ ctx, input: { name, data } }) => {
      let files = JSON.stringify(data);

      return await ctx.prisma.package.update({
        where: { name },
        data: { files },
      });
    }),
});
