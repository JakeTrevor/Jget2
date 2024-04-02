import { Fragment, type ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export const Breadcrumbs = ({
  base,
  path,
  baseIcon = "/",
}: {
  base: string;
  path: string[];
  baseIcon?: ReactNode;
}) => {
  const BaseComp = path.length ? BreadcrumbLink : BreadcrumbPage;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BaseComp href={base}>{baseIcon}</BaseComp>
        </BreadcrumbItem>
        {path.map((segment, i) => {
          const isLastItem = i === path.length - 1;
          const Comp = isLastItem ? BreadcrumbPage : BreadcrumbLink;

          const prevItems = path.slice(0, i + 1);

          const href = base + prevItems.join("/");

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Comp href={href}>{segment}</Comp>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
