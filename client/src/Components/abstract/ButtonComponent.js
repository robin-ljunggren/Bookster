import React from 'react';

export default function ButtonComponent({className, testId, onClick, txt}) {
  return (
    <button className={`btn ${className}`} data-testid={testId} onClick={onClick}>{txt}</button>
  )
}
