export function Button({ children, variant = "primary", ...props }) {
  const base =
    "px-6 py-3 text-lg rounded-xl font-medium transition-all duration-200";
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-indigo-600 hover:underline",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
