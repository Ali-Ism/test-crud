import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  // URL de base de l'API
  const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

  /**
   * Récupère tous les utilisateurs depuis l'API
   *
   * Effectue une requête GET vers l'endpoint users.php pour obtenir
   * la liste complète des utilisateurs enregistrés en base de données.
   */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users.php`);
      setUsers(res.data);
      setFilter("all");
    } catch (err) {
      console.error("Erreur chargement utilisateurs:", err);
    }
  };

  /**
   * Récupère les utilisateurs ajoutés hier
   *
   * Effectue une requête GET vers l'endpoint users_yesterday.php pour obtenir
   * uniquement les utilisateurs créés la veille.
   */
  const fetchYesterdayUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users_yesterday.php`);
      setUsers(res.data.users);
      setFilter("yesterday");
    } catch (err) {
      console.error("Erreur chargement utilisateurs d’hier:", err);
    }
  };

  /**
   * Gère la suppression d'un utilisateur
   *
   * Affiche une boîte de dialogue de confirmation avant de procéder
   * à la suppression définitive de l'utilisateur via l'API.
   * Actualise automatiquement la liste après suppression.
   */
  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'utilisateur avec l'email : ${user.email} ?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/users.php?id=${user.id}`);
      filter === "yesterday" ? fetchYesterdayUsers() : fetchUsers();
    } catch (err) {
      console.error("Erreur suppression utilisateur:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Liste des utilisateurs</h4>

      <div className="mb-4">
        <button
          className={`btn me-2 ${
            filter === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={fetchUsers}
        >
          Tous les utilisateurs
        </button>
        <button
          className={`btn ${
            filter === "yesterday" ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={fetchYesterdayUsers}
        >
          Utilisateurs d’hier
        </button>
      </div>

      {users.length === 0 ? (
        <p>Aucun utilisateur enregistré.</p>
      ) : (
        <ul className="list-group">
          {users.map((u) => (
            <li
              key={u.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>
                  {u.firstname} {u.lastname}
                </strong>
                <br />
                {u.email} — {u.phone}
              </div>
              <div>
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  title="Modifier"
                  onClick={() => setSelectedUser(u)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  title="Supprimer"
                  onClick={() => handleDelete(u)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
