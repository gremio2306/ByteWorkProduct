import * as React from "react";

const Input = React.forwardRef(function Input(
  { className = "", type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={
        "flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-[rgb(var(--text-main))] shadow-sm transition " +
        "placeholder:text-slate-400 " +
        "focus-visible:outline-none focus-visible:border-[rgba(11,28,45,0.35)] focus-visible:ring-2 focus-visible:ring-[rgba(11,28,45,0.15)] " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
      {...props}
    />
  );
});

export { Input };
