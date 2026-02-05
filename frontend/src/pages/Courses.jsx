import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../index.css";
import { Link } from "react-router-dom";

export default function AllCourses() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os cursos da API
  useEffect(() => {
    api
      .get("/cursos")
      .then((res) => {
        setCursos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar cursos");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;

    try {
      await api.delete(`/cursos/${id}`);
      setCursos(cursos.filter((curso) => curso.id !== id));
      alert("Curso excluído com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir curso");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Carregando cursos...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (loading)
    return <p className="text-center mt-10 text-white">Carregando cursos...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-900 ">
      <Navbar />

      <main className="container mx-auto px-3 py-5">
        <h1 className="text-3xl font-bold mb-3 text-center">Todos os Cursos</h1>

        <div className="flex flex-wrap gap-6 justify-center">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="w-full sm:w-1/4 lg:w-1/4 bg-slate-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={curso.image_url || `http://localhost:5000/uploads/cursos/${curso.imagem_url}`}
                alt={curso.titulo}
                className="w-full h-48 object-cover border-2 border-cyan-400"
              />
              <div className="p-4 bg-slate-200">
                <h2 className="text-xl font-semibold mb-2 text-shadow-md text-shadow-cyan-200">{curso.titulo}</h2>
                {curso.descricao && (
                  <p className="text-sm text-slate-600">{curso.descricao}</p>
                )}
                {curso.status == "ativo" && (
                  <p className="text-sm text-green-600">Ativo / {curso.tipo}</p>
                )}
                {curso.status == "inativo" && (
                  <p className="text-sm text-red-600">Inativo / {curso.tipo}</p>
                )}
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/cursos/editar/${curso.id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(curso.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}