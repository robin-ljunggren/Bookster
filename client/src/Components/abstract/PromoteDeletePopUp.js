import React from 'react'

export default function PromoteDeletePopUp({promoteDeleteRef, pageState, method, title, username}) {

  return (
    <article>
      {method === 'Delete' &&
        <h3>{pageState === 'books' ? 'Delete book' : 'Delete user'}</h3>
      }
      {method === 'Promote' &&
        <h3>Change users role</h3>
      }
      <p>{
        `Are you sure you wish to ${method === 'Delete' ? 'delete' : 'promote'} 
        ${pageState === 'books' ? 'book' : 'user'} 
        ${pageState === 'books' ? title : method === 'Promote' ? `${username} to admin` : username}`
      }</p>
      <div>
        <button>{method === 'Promote' ? 'Promote' : 'Delete'}</button>
        <button onClick={(e) => {e.preventDefault(); promoteDeleteRef.current.close()}}>Cancel</button>
      </div>
    </article>
  )
}
