/** This file is for a button component  */

import React from "react";

export default function ButtonComponent({
  className,
  testId,
  onClick,
  txt,
  isDisabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      data-testid={testId}
      onClick={onClick}
      disabled={isDisabled}>
      {txt}
    </button>
  );
}
