import * as React from "react";

const Button = React.forwardRef(function Button(
  { className = "", variant = "primary", size = "md", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-extrabold transition-all " +
    "focus:outline-none focus:ring-2 focus:ring-[rgba(11,28,45,0.25)] focus:ring-offset-2 focus:ring-offset-white " +
    "disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-sm",
  };

  const variants = {
    /* Primary Action (Beli, Submit, Checkout) */
    primary:
      "bg-[rgb(var(--navy-900))] text-white shadow-sm hover:bg-[rgb(var(--navy-800))]",

    /* Secondary Action (Detail, Cancel) */
    outline:
      "border border-[rgba(11,28,45,0.25)] bg-white text-[rgb(var(--navy-900))] shadow-sm hover:bg-[rgb(var(--bg-soft))]",

    /* Soft / ghost action */
    ghost:
      "bg-transparent text-[rgb(var(--navy-900))] hover:bg-[rgb(var(--bg-soft))]",

    /* Destructive */
    destructive:
      "bg-[rgb(var(--danger))] text-white shadow-sm hover:bg-rose-700",
  };

  return (
    <button
      ref={ref}
      className={`${base} ${sizes[size] || sizes.md} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    />
  );
});

export { Button };
