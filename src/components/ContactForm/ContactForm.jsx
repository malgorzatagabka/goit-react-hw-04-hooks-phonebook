import { nanoid } from 'nanoid';
import React from 'react';

import style from './ContactForm.module.css'

const INITIAL_STATE = {
  id: '',
  name: '',
  number: '',
};

class ContactForm extends React.Component {
  state = { ...INITIAL_STATE };
  
  id = nanoid();

    handleChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    
    this.props.onSubmit({ ...this.state })
    this.reset();
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  render() {
    return (
      <form className={style.form } onSubmit={this.handleSubmit}>
        <label htmlFor={this.id}>Name</label>
        <input className={style.formInput}
          id={this.id}
          onChange={this.handleChange}
          value={this.state.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={this.id}>Phone</label>
        <input className={style.formInput}
          id={this.id}
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={ style.formBtn} type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
