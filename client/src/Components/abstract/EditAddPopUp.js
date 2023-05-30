import React from 'react'
import ButtonComponent from './ButtonComponent'

export default function EditAddPopUp({
    editAddRef,
    method, 
    title, 
    author, 
    qty
  }) {

  return (
    <form>
      <button onClick={(e) => {e.preventDefault(); editAddRef.current.close()}}>X</button>
          <h3>{method}book</h3>
          <label>{method === 'Add' ? 'Title' : `Title - ${title}`}</label>
          <input type="text" placeholder='Insert new title here'/>
          <label>{method === 'Add' ? 'Author' : `Author - ${author}`}</label>
          <input type="text" placeholder='Insert new author here'/>
          <label>{method === 'Add' ? 'Quantity' : `Quantity - ${qty}`}</label>
          <input type="text" placeholder='Insert new quantity here'/>
          <div>
            <ButtonComponent onClick={() => {}} txt={'Save changes'}/>
            <ButtonComponent onClick={(e) => {e.preventDefault(); editAddRef.current.close()}} txt={'Discard changes'}/>
          </div>
    </form>
  )

}
