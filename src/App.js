import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './Utils/ContactsAPI'


class App extends Component {

  state = {
    screen: 'list', //list or create screens
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
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={()=>{
              this.setState({screen: 'create'})
            }}
          />
        )}
        {this.state.screen ==='create' && (
          <CreateContact/>
        )}
      </div>
    )
  }
}

export default App;
