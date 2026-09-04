import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "white";
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "font-body 2xl:text-lg text-sm w-full sm:w-auto px-5 py-2 rounded-[10px] transition-all duration-300 inline-block text-center border";

  const variantClasses = {
    primary:
      "bg-primary border-primary text-white hover:border-white hover:bg-transparent hover:text-white",
    outline:
      "bg-transparent border-white text-white hover:bg-white hover:text-slate-900",
    white:
      "bg-white border-white text-slate-900 hover:bg-transparent hover:text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}