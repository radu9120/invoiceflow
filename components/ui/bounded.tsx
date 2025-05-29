"use client";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp className={clsx("lg:py-24 xl:py-24 py-10", className)} {...restProps}>
      <div className="mx-auto px-4 md:px-6 lg:px-12 w-full max-w-[1500px] space-y-8 md:space-y-16">
        {children}
      </div>
    </Comp>
  );
}
