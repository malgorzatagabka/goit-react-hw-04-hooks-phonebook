//import { nanoid } from "nanoid";
// import { ContactListItem } from "./ContactListItem"
import PropTypes from 'prop-types';
import style from './Contacts.module.css'

export const ContactList = ({ contacts, toDelete }) => (
  <ul className={style.contactsList}>
    {contacts.map(({ id, name, number }) => (
      <li className={style.contactsItem} key={id}>
        <p>
          {name}: {number}
        </p>
            <button className={style.contactBtn}type="submit" onClick={() => toDelete(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

// export const ContactList = ({ contacts }) => {
//     return (
//         <ul>
//             {contacts.map(contact => (
//                 <ContactListItem
//                     key={contact.id}
//                     name={contact.name}
//                     number={contact.number}
//                 />
//             ))}
//         </ul>
//     );
// }

ContactList.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    toDelete: PropTypes.func.isRequired,
}