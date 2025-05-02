/**
 * MyButton.tsx
 * 一個基於Material Design設計的按鈕組件
 */
import { Component, createSignal } from "solid-js";

interface MyButtonProps {
  text?: string;
  onClick?: (e: MouseEvent) => void;
  variant?: "filled" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  icon?: string;
}

const MyButton: Component<MyButtonProps> = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  const [isActive, setIsActive] = createSignal(false);
  
  // 設置默認值
  const text = props.text || "Button";
  const variant = props.variant || "filled";
  const color = props.color || "primary";
  const size = props.size || "md";
  
  // 基於尺寸的類
  const sizeClasses = {
    sm: "text-sm px-3 py-1 rounded-lg h-8",
    md: "text-base px-4 py-2 rounded-lg h-10",
    lg: "text-lg px-6 py-3 rounded-lg h-12"
  };
  
  // 基於顏色的類
  const colorClasses = {
    primary: {
      filled: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
      outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
      text: "text-blue-600 hover:bg-blue-50 active:bg-blue-100"
    },
    secondary: {
      filled: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
      outlined: "border border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100",
      text: "text-purple-600 hover:bg-purple-50 active:bg-purple-100"
    },
    success: {
      filled: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
      outlined: "border border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100",
      text: "text-green-600 hover:bg-green-50 active:bg-green-100"
    },
    warning: {
      filled: "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800",
      outlined: "border border-amber-600 text-amber-600 hover:bg-amber-50 active:bg-amber-100",
      text: "text-amber-600 hover:bg-amber-50 active:bg-amber-100"
    },
    error: {
      filled: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
      outlined: "border border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100",
      text: "text-red-600 hover:bg-red-50 active:bg-red-100"
    }
  };
  
  // 合併類名
  const buttonClasses = `
    font-medium transition-all duration-200 ease-in-out
    inline-flex items-center justify-center gap-2
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color === 'primary' ? 'blue' : color}-500
    ${isHovered() ? 'shadow-md transform -translate-y-0.5' : 'shadow'}
    ${isActive() ? 'transform translate-y-0.5 shadow-inner' : ''}
    ${sizeClasses[size]}
    ${colorClasses[color][variant]}
  `;
  
  // 事件處理器
  const handleClick = (e: MouseEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };
  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  
  return (
    <button
      class={buttonClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.icon && <span class="material-icons text-lg">{props.icon}</span>}
      {text}
    </button>
  );
};

export default MyButton;