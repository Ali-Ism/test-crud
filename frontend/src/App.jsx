import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Application de gestion des utilisateurs</h2>
      <UserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <UserList setSelectedUser={setSelectedUser} />
    </div>
  );
};

export default App;
