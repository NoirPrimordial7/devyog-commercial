import { cloneElement, forwardRef } from "react";

const styles = {
  primary:
    "border-champagne bg-champagne text-obsidian hover:bg-[#dfc082] hover:border-[#dfc082]",
  outline:
    "border-white/30 bg-black/10 text-ivory backdrop-blur-md hover:border-champagne/70 hover:bg-white/10",
};

export const Button = forwardRef(function Button(
  { className = "", variant = "primary", asChild = false, children, ...props },
  ref,
) {
  const classes = `group inline-flex h-12 items-center justify-center gap-3 rounded-full border px-6 text-[11px] font-semibold uppercase tracking-[0.17em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`;

  if (asChild && children) {
    return cloneElement(children, {
        ...children.props,
        ...props,
        className: `${classes} ${children.props.className || ""}`,
        ref,
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});
