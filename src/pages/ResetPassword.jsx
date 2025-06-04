import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    email: params.get("email") || "",
    token: params.get("token") || "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || "Errore generico.");
      }
    } catch (err) {
      setError("Errore di rete.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold">Reset Password</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          readOnly
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Nuova password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Conferma password"
          value={form.password_confirmation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reimposta password
        </button>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
