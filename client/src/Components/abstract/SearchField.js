import React from 'react'

export default function SearchField(onChange) {

  return (
    <input type="text" placeholder='Title/Author' onChange={onChange} />
  )
}
