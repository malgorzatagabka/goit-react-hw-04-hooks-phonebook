import React from 'react';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';

import style from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsSaved = localStorage.getItem("contacts");
    if (contactsSaved) {
      this.setState ({ contacts: JSON.parse(contactsSaved) });
    }
  }
  
 componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  add = ({ name, number }) => {
    const toLowerCase = name.toLowerCase();
    const contacts = this.state.contacts;
    let nameOntheList = false;

    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === toLowerCase) {
        alert(`${contact.name} is already in contacts`);
        nameOntheList = true;
      }
    });

    if (nameOntheList) return;

    this.setState(prevState => ({
      contacts: prevState.contacts.concat(newContact),
    }));
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterItems = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.add} />
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={this.filterItems()}
          toDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
