import * as React from "react";

const Button = React.forwardRef(function Button(
  { className = "", variant = "default", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-slate-200 hover:bg-slate-50",
    destructive: "bg-rose-600 text-white hover:bg-rose-700",
  };

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
});

export { Button };