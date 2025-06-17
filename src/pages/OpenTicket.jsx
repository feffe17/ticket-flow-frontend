import React, { useState } from "react";
import axios from "axios";

export default function CreateTicketPage() {
  const [titolo, setTitolo] = useState("");
  const [commento, setCommento] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Aggiorna immagini e prepara preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (idx) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const formData = new FormData();
      formData.append("titolo", titolo);
      formData.append("commento", commento);
      images.forEach((img) => formData.append("images", img));

      await axios.post(
        "http://localhost:8000/api/ticket/open",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess(true);
      setTitolo("");
      setCommento("");
      setImages([]);
      setPreviews([]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Errore durante l'invio del ticket. Riprova."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Crea un nuovo Ticket</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Titolo:</label>
          <input
            type="text"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Inserisci il titolo del ticket"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Commento:</label>
          <textarea
            value={commento}
            onChange={(e) => setCommento(e.target.value)}
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Descrivi il problema o la richiesta..."
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Immagini (max 5):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
          />
          {Boolean(previews.length) && (
            <ul className="flex flex-wrap gap-3 mt-2">
              {previews.map((src, idx) => (
                <li key={src} className="relative">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full px-1 text-xs text-red-500 hover:bg-opacity-100"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-semibold text-white ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Invio in corso..." : "Crea ticket"}
        </button>
        {success && (
          <div className="text-green-600 text-center font-semibold">
            Ticket creato con successo!
          </div>
        )}
        {error && (
          <div className="text-red-600 text-center font-semibold">{error}</div>
        )}
      </form>
    </div>
  );
};

