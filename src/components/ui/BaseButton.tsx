// Button.tsx
import { JSX, splitProps, createEffect } from "solid-js";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  rounded?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  autoBlur?: boolean; // 新增自動失去焦點的屬性
}

const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "size",
    "fullWidth",
    "rounded",
    "leftIcon",
    "rightIcon",
    "class",
    "children",
    "disabled",
    "autoBlur",
    "onClick",
  ]);

  const aotuBlur = local.autoBlur || true;

  // 處理點擊事件，添加自動失去焦點功能
  const handleClick = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    if (typeof local.onClick === "function") {
      local.onClick(event);
    }

    // 如果設定了 autoBlur，點擊後自動移除焦點
    if (aotuBlur && event.currentTarget) {
      (event.currentTarget as HTMLButtonElement).blur();
    }
  };

  const getVariantClasses = () => {
    switch (local.variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-600 text-white shadow-sm focus:bg-blue-500";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm focus:bg-gray-200";
      case "outline":
        return "bg-transparent hover:bg-gray-100 text-blue-500 border border-blue-500 focus:bg-transparent";
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-blue-500 focus:bg-transparent";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white shadow-sm focus:bg-blue-500";
    }
  };

  const getSizeClasses = () => {
    switch (local.size) {
      case "sm":
        return "text-xs px-3 py-1.5";
      case "md":
        return "text-sm px-4 py-2";
      case "lg":
        return "text-base px-6 py-3";
      default:
        return "text-sm px-4 py-2";
    }
  };

  let buttonRef: HTMLButtonElement | undefined;

  return (
    <button
      ref={buttonRef}
      class={`
        inline-flex items-center justify-center font-medium transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-0
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${local.fullWidth ? "w-full" : ""}
        ${local.rounded ? "rounded-full" : "rounded-md"}
        ${local.disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${local.class || ""}
      `}
      disabled={local.disabled}
      onClick={handleClick}
      {...others}
    >
      {local.leftIcon && <span class="mr-2">{local.leftIcon}</span>}
      {local.children}
      {local.rightIcon && <span class="ml-2">{local.rightIcon}</span>}
    </button>
  );
};

export default Button;