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
      }),
    )
    .output(
      z.object({
        name: z.string(),
        files: z.string(),
        dependencies: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input: { name } }) => {
      const record = await ctx.db.package.findUnique({
        where: {
          name: name,
        },
      });

      if (!record) throw new Error("No such package");

      const pkg = await ctx.db.package.update({
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
          dependencies: {
            select: { dependsOn: { select: { name: true } } },
          },
        },
      });
      return {
        ...pkg,
        dependencies: pkg.dependencies.map((e) => e.dependsOn.name),
      };
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
      }),
    )
    .output(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const dependency_names = input.dependencies;
      const data = {
        name: input.name,
        files: input.files,
      };

      const dependencies = await Promise.all(
        dependency_names.map(async (dep_name) => {
          const dep = await ctx.db.package.findUnique({
            where: { name: dep_name },
          });
          if (!dep) throw new Error(`Dependency not found: ${dep_name}`);
          return dep;
        }),
      );

      const package_obj = await ctx.db.package.upsert({
        where: {
          name: input.name,
        },
        create: data,
        update: { ...data, updatedAt: new Date(Date.now()) },
      });

      if (!dependencies) return package_obj;

      await ctx.db.dependency.createMany({
        data: dependencies.map((dep) => {
          return { forID: package_obj.ID, depID: dep.ID };
        }),
      });

      return package_obj;
    }),
});
