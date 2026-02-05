import { useEffect, useState } from "react";
import api from "../services/api";
import "../../index.css"

function GetCourses() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/cursos")
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar items:", error);
      });
  }, []);

  return (
    
    <div className="p-">
      <h1 className="text-2xl font-bold mb-4">
        Cursos disponíveis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="text-lg font-semibold">
              {item.titulo}
            </h2>

            <p className="text-sm text-gray-600">
              {item.descricao}
            </p>

            <p className="mt-2 font-bold">
              R$ {item.valor}
            </p>

            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetCourses;