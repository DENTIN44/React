import React from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';

const ContactDetail = () => {
  const { id } = useParams();
  return <p>Contact ID: {id}</p>;
};

const Contact = () => {
  return (
    <div>
      <h1>Welcome to Contact Page</h1>
      <strong>Select contact Id</strong>
      <ul>
        <li><Link to="/contact/1">Contacts 1</Link></li>
        <li><Link to="/contact/2">Contacts 2</Link></li>
        <li><Link to="/contact/3">Contacts 3</Link></li>
        <li><Link to="/contact/4">Contacts 4</Link></li>
      </ul>

      <Routes>
        <Route path=":id" element={<ContactDetail />} />
      </Routes>
    </div>
  );
};

export default Contact;
