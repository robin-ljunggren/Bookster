import React from "react";

export default function ButtonComponent({
  className,
  testId,
  onClick,
  txt,
  isDisabled = false,
}) {
  return (
    <button
      className={`btn ${className}`}
      data-testid={testId}
      onClick={onClick}
      disabled={isDisabled}>
      {txt}
    </button>
  );
}
