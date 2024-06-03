import React, { FC, HTMLProps } from "react";

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant?: "primary" | "outline-primary" | "link" | "primary-mobile";
};

const Button: FC<ButtonProps> = ({ onClick, children, variant = "primary", disabled, href, id, style, className }) => {
  const commonStyle = "rounded-34px m-auto font-bold text-base";

  const getButtonElement = () => {
    let variantButton = "";
    switch (variant) {
      case "primary":
        variantButton = `${commonStyle} border-primary bg-primary`;
        break;
      case "primary-mobile":
        variantButton = "border-primary bg-primary rounded-lg text-sm font-semibold mr-10px";
        break;
      case "outline-primary":
        variantButton = `${commonStyle} bg-transparent border-primary text-primary`;
        break;
      case "link":
        variantButton = `${commonStyle} text-primary`;
        break;
      default:
        variantButton = `${commonStyle} border-primary bg-primary`;
        break;
    }

    const baseClassName = `flex items-center justify-center max-w-fit py-2 px-6 sm:text-lg text-center text-white align-middle break-words outline-none border border-solid cursor-pointer disabled:border-primary capitalize disabled:bg-primary disabled:opacity-70 disabled:cursor-default ${variantButton}`;

    return href ? (
      <a
        className={className || baseClassName}
        href={href}
        id={id}
        style={style}
      >
        {children}
      </a>
    ) : (
      <button
        className={className || baseClassName}
        onClick={onClick}
        disabled={disabled}
        id={id}
        style={style}
      >
        {children}
      </button>
    );
  };

  return getButtonElement();
};

export default Button;
