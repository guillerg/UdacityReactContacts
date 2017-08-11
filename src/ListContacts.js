import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



//Stateless functional component
//For components that only have render method
class ListContacts extends Component{
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render(){

  //Object destructuring ES6
  const {contacts, onDeleteContact} = this.props
  const {query} = this.state


  let showingContacts
  if (query){
    const match = new RegExp(escapeRegExp(query), 'i')
    showingContacts = contacts.filter((contact)=> match.test(contact.name))
  } else {
    showingContacts = contacts
  }

  showingContacts.sort(sortBy('name'))

  return(
    <div className='List-contacts'>
      {JSON.stringify(this.state)}
      <div className='List-contacts-top'>
        <input
          className='search-contacts'
          type='text'
          placeholder='search contacts'
          value={this.state.query}
          onChange={(event)=>this.updateQuery(event.target.value)}
        />
      </div>
      <ol className='contact-list'>
        {showingContacts.map((contact) =>(
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style ={{
              //template literals back-ticks
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
}

export default ListContacts
