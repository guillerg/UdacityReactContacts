import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './Utils/ContactsAPI'

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    //returns a promise, we can use then
    ContactsAPI.getAll().then((contacts)=>{
      this.setState({contacts}) //same as ({contacts: contacts})
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    //ContactsAPI.remove(contact)
  }

  render() {
    return(
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
      </div>
    )
  }
}

export default App;
