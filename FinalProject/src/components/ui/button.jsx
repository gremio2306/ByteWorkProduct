import * as React from "react";

const Button = React.forwardRef(function Button(
  { className = "", variant = "default", size = "md", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white " +
    "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-sm",
  };

  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    outline:
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-sm",
    destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
  };

  return (
    <button
      ref={ref}
      className={`${base} ${sizes[size] || sizes.md} ${
        variants[variant] || variants.default
      } ${className}`}
      {...props}
    />
  );
});

export { Button };
