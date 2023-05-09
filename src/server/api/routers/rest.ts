import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const restRouter = createTRPCRouter({
  download: publicProcedure
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
    .query(async ({ ctx, input: { name } }) => {
      let record = await ctx.prisma.package.findUnique({
        where: {
          name: name,
        },
      });

      if (!record) throw new Error("No such package");

      return await ctx.prisma.package.update({
        where: {
          name: name,
        },
        data: {
          downloads: {
            increment: 1,
          },
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
        dependencies: z.array(z.string()),
      })
    )
    .output(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let dependency_names = input.dependencies;
      let data = {
        name: input.name,
        files: input.files,
      };

      let dependencies = await Promise.all(
        dependency_names.map(async (dep_name) => {
          let dep = await ctx.prisma.package.findUnique({
            where: { name: dep_name },
          });
          if (!dep) throw new Error(`Dependency not found: ${dep_name}`);
          return dep;
        })
      );

      let package_obj = await ctx.prisma.package.upsert({
        where: {
          name: input.name,
        },
        create: data,
        update: { ...data, updatedAt: new Date(Date.now()) },
      });

      if (!dependencies) return package_obj;

      ctx.prisma.dependency.createMany({
        data: dependencies.map((dep) => {
          return { forID: package_obj.ID, depID: dep.ID };
        }),
      });

      return package_obj;
    }),
});
