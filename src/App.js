import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
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

  createContact(contact){
    ContactsAPI.create(contact).then(contact =>{
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  render() {
    return(
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>

        <Route exact path='/create' render={( { history }) => (
          <CreateContact
            onCreateContact={(contact)=> {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
