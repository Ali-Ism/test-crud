import React, { useEffect, useState } from 'react';
import axios from 'axios';
//C est le composant formulaire pour ajouter ou modifier un utilisateur
const UserForm = ({ selectedUser, setSelectedUser }) => {

  // URL de base de l'API
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
 // si on clique sur modifier dans la liste des utilisateurs le formulaire se rempli automatiquement par les infos de l'utilisateur qui est sélectionné pour modification
  useEffect(() => {
    if (selectedUser) {
      setForm({
        firstname: selectedUser.firstname,
        lastname: selectedUser.lastname,
        email: selectedUser.email,
        phone: selectedUser.phone
      });
    } else {
      setForm({ firstname: '', lastname: '', email: '', phone: '' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Valide les données du formulaire côté client
    if (form.firstname.trim().length < 2) return setError('Le prénom doit contenir au moins 2 caractères.');
    if (form.lastname.trim().length < 2) return setError('Le nom doit contenir au moins 2 caractères.');
    if (!form.email.includes('@')) return setError('Veuillez entrer une adresse email valide.');

    try {
      const url = selectedUser
        ? `${API_BASE_URL}/users.php?id=${selectedUser.id}`
        : `${API_BASE_URL}/users.php`;

      const method = selectedUser ? 'put' : 'post';
      const response = await axios[method](url, form);

      if (response.data.error) {
        return setError(response.data.error);
      }

      setSuccessMsg(selectedUser ? '✅ Utilisateur modifié avec succès !' : '✅ Utilisateur ajouté avec succès !');
      setForm({ firstname: '', lastname: '', email: '', phone: '' });
      setSelectedUser(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Erreur ajout/modification utilisateur:', err);
      setError("Une erreur est survenue lors de l'envoi des données.");
    }
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h4 className="mb-3">{selectedUser ? 'Modifier' : 'Ajouter'} un utilisateur</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label>Prénom</label>
            <input name="firstname" className="form-control" value={form.firstname} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label>Nom</label>
            <input name="lastname" className="form-control" value={form.lastname} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Téléphone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedUser ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
