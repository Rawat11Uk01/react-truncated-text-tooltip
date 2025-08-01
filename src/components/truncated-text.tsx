import React, { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";

export interface TruncatedTextProps {
  /** Number of lines before truncation (default: 2) */
  lines?: number;
  /** Text content (string or JSX) */
  content: React.ReactNode;
  /** Optional string for the tooltip; if not provided, use content if it's a string */
  tooltipText?: string;
  /** Tooltip position ('top', 'bottom', 'left', 'right'; default: 'bottom') */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Custom class for the container */
  className?: string;
  /** Custom inline styles for the container */
  style?: React.CSSProperties;
  /** Custom class for the truncated text */
  truncatedClassName?: string;
  /** Custom styles for the truncated text */
  truncatedStyle?: React.CSSProperties;
  /** Custom class for the tooltip */
  tooltipClassName?: string;
  /** Custom styles for the tooltip */
  tooltipStyle?: React.CSSProperties;
  /** HTML tag to render (e.g., 'p', 'h1'; default: 'p') */
  tag?: React.ElementType;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  lines = 2,
  content,
  tooltipText,
  tooltipPosition = "bottom",
  className,
  style,
  truncatedClassName,
  truncatedStyle,
  tooltipClassName,
  tooltipStyle,
  tag: Tag = "p",
}) => {
  const textRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const displayTooltipText =
    tooltipText || (typeof content === "string" ? content : "");

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        // Check if content is overflowing by comparing scroll height with client height
        const isTextOverflowing =
          textRef.current.scrollHeight > textRef.current.clientHeight;
        setIsOverflowing(isTextOverflowing);
      }
    };

    checkOverflow();

    // Recheck on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [content, lines]);

  const truncatedStyles: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ...truncatedStyle,
  };

  const getTooltipClasses = () => {
    const baseClasses = [
      "absolute",
      "z-50",
      "max-w-xs",
      "px-2",
      "py-1",
      "text-sm",
      "text-white",
      "bg-gray-900",
      "rounded",
      "shadow-lg",
      "opacity-0",
      "pointer-events-none",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "whitespace-normal",
      "break-words",
      "group-hover:opacity-100",
      "group-hover:pointer-events-auto",
    ];

    const positionClasses = {
      top: [
        "bottom-full",
        "left-1/2",
        "-translate-x-1/2",
        "mb-2",
        "group-hover:-translate-y-1",
      ],
      bottom: [
        "top-full",
        "left-1/2",
        "-translate-x-1/2",
        "mt-2",
        "group-hover:translate-y-1",
      ],
      left: [
        "right-full",
        "top-1/2",
        "-translate-y-1/2",
        "mr-2",
        "group-hover:-translate-x-1",
      ],
      right: [
        "left-full",
        "top-1/2",
        "-translate-y-1/2",
        "ml-2",
        "group-hover:translate-x-1",
      ],
    };

    return [...baseClasses, ...positionClasses[tooltipPosition]];
  };

  const getArrowClasses = () => {
    const baseArrowClasses = ["absolute", "w-0", "h-0", "border-solid"];

    const arrowClasses = {
      top: [
        "top-full",
        "left-1/2",
        "-translate-x-1/2",
        "border-l-4",
        "border-r-4",
        "border-t-4",
        "border-l-transparent",
        "border-r-transparent",
        "border-t-gray-900",
      ],
      bottom: [
        "bottom-full",
        "left-1/2",
        "-translate-x-1/2",
        "border-l-4",
        "border-r-4",
        "border-b-4",
        "border-l-transparent",
        "border-r-transparent",
        "border-b-gray-900",
      ],
      left: [
        "left-full",
        "top-1/2",
        "-translate-y-1/2",
        "border-t-4",
        "border-b-4",
        "border-l-4",
        "border-t-transparent",
        "border-b-transparent",
        "border-l-gray-900",
      ],
      right: [
        "right-full",
        "top-1/2",
        "-translate-y-1/2",
        "border-t-4",
        "border-b-4",
        "border-r-4",
        "border-t-transparent",
        "border-b-transparent",
        "border-r-gray-900",
      ],
    };

    return [...baseArrowClasses, ...arrowClasses[tooltipPosition]];
  };

  // If text is not overflowing or no tooltip content, render without tooltip
  if (!isOverflowing || !displayTooltipText) {
    return (
      <Tag
        ref={textRef}
        className={cn(truncatedClassName)}
        style={truncatedStyles}
      >
        {content}
      </Tag>
    );
  }

  return (
    <div className={cn("relative inline-block group", className)} style={style}>
      <Tag
        ref={textRef}
        className={cn(truncatedClassName)}
        style={truncatedStyles}
      >
        {content}
      </Tag>

      {/* Tooltip - only rendered when text is overflowing */}
      <div
        className={cn(getTooltipClasses(), tooltipClassName)}
        style={tooltipStyle}
        role="tooltip"
        aria-hidden="true"
      >
        {displayTooltipText}
        {/* Arrow */}
        <div className={cn(getArrowClasses())} />
      </div>
    </div>
  );
};

export default TruncatedText;
