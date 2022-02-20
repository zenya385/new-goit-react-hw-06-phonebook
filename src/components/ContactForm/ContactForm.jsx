import { useState } from 'react';
import PropTypes from 'prop-types';
import { addContact } from '../../redux/contacts/contactsAction';
import s from './ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

export default function ContactForm() {
  const contacts = useSelector(state => state.contacts.itemsReducer);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  // const formSubmitHandler = user => {
  //   if (contacts.find(el => el.name.includes(user.name)) !== undefined) {
  //     alert(`${user.name} is already in contacts`);
  //   } else {
  //     setContacts(contacts => [...contacts, user]);
  //   }
  // };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      // id: nanoid(),
      name,
      number,
    };
    if (contacts.find(el => el.name.includes(newContact.name))) {
      alert(`${newContact.name} is already in contacts`);
    }
    dispatch(addContact(newContact));

    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          className={s.name}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          name="number"
          className={s.number}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
