import React from 'react'

export default function SearchField(placeholder, onChange) {

  return (
    <input type="text" placeholder={placeholder} onChange={onChange} />
  )
}
