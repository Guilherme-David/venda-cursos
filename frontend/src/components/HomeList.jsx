import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "../index.css";

export default function HomeList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.get("/cursos")
      .then(res => setCursos(res.data))
      .catch(err => console.error("Erro ao carregar cursos:", err));
  }, []);

  if (cursos.length === 0) return <p className="text-white text-center mt-10">Carregando cursos...</p>;

  return (
    <div className="carousel-wrapper overflow-hidden w-full h-64 bg-slate-800">
      <div className="carousel-track flex animate-slide gap-8">
        {cursos.map((curso) => (
          <div key={curso.id} className="shrink-0 w-94 h-64 rounded-lg overflow-hidden shadow-lg">
            <img
              src={curso.image_url || `http://localhost:5000/uploads/cursos/${curso.imagem_url}`} 
              alt={curso.titulo}
              className="w-full h-full object-cover"
            />
            {curso.titulo}
          </div>
        ))}
        {cursos.map((curso) => (
          <div key={curso.id + "-2"} className="shrink-0 w-94 h-64 rounded-lg overflow-hidden shadow-lg">
            <img
              src={curso.image_url || `http://localhost:5000/uploads/cursos/${curso.imagem_url}`} 
              alt={curso.titulo}
              className="w-full h-full object-cover"
            />
            <p>
                {curso.titulo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
