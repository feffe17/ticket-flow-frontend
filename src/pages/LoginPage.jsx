import React, { useState } from "react";
import axios from "axios";

export default function LoginPage({ onLogin }){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Adatta i nomi dei parametri se diversi sul tuo backend
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      // Se vuoi gestire login globalmente, chiama onLogin(res.data) o salva il token qui
      if (onLogin) onLogin(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Errore durante il login. Controlla le credenziali."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Accedi al tuo account</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email:</label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Inserisci la tua email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password:</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Inserisci la tua password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Accesso in corso..." : "Accedi"}
        </button>
        {error && (
          <div className="text-red-600 text-center font-semibold">{error}</div>
        )}
      </form>
    </div>
  );
};

