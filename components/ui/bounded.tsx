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
    <Comp className={clsx("min-h-screen bg-gradient-to-br from-blue-50 via-white to-white", className)} {...restProps}>
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        {children}
      </div>
    </Comp>
  );
}
