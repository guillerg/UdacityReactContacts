import React, { Component } from 'react';

//Stateless functional component
//For components that only have render method
function ListContacts(props){
  return(
    <ol className='contact-list'>
      {props.contacts.map((contact) =>(
        <li key={contact.id} className='contact-list-item'>
          <div className='contact-avatar' style ={{
            //template literals back-ticks
            backgroundImage: `url(${contact.avatarURL})`
          }}/>
          <div className='contact-details'>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
          <button className='contact-remove'>
            Remove
          </button>
        </li>
      ))}
    </ol>
  )
}

export default ListContacts
