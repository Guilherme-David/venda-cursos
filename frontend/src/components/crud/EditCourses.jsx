import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../Navbar";

function EditCourse() {
  const { id } = useParams(); // pega o id da rota
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("curso-online");
  const [status, setStatus] = useState("ativo");
  const [imagem, setImagem] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(""); // para mostrar imagem existente

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os dados do curso ao carregar
  useEffect(() => {
    api
      .get(`/cursos/${id}`)
      .then((res) => {
        const curso = res.data;
        setTitulo(curso.titulo);
        setDescricao(curso.descricao);
        setValor(curso.valor);
        setTipo(curso.tipo);
        setStatus(curso.status);
        setImagemAtual(curso.imagem_url);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar curso");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagemUrl = imagemAtual;

      // Se o usuário enviar uma nova imagem, faz upload
      if (imagem) {
        const formData = new FormData();
        formData.append("image", imagem);

        const uploadRes = await api.post("/cursos/upload", formData);
        imagemUrl = uploadRes.data.filename;
      }

      // Atualiza o curso
      await api.put(`/cursos/${id}`, {
        titulo,
        descricao,
        valor: Number(valor),
        tipo,
        status,
        imagem_url: imagemUrl,
      });

      alert("Curso atualizado com sucesso!");
      navigate("/cursos"); // redireciona para a lista de cursos
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar curso");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Carregando curso...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-slate-900 min-h-screen py-10">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto my-6 bg-white shadow-xl rounded-2xl flex flex-col gap-6 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Editar Curso
        </h2>

        {/* TÍTULO */}
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200
          transition duration-200"
        />

        {/* DESCRIÇÃO */}
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200
          transition duration-200 resize-none h-32"
        />

        {/* VALOR */}
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 
          transition duration-200"
        />

        {/* TIPO */}
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200
          transition duration-200 bg-white"
        >
          <option value="curso-online">Curso online</option>
          <option value="curso-presencial">Curso presencial</option>
        </select>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition duration-200 bg-white"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="arquivado">Arquivado</option>
        </select>

        {/* IMAGEM ATUAL */}
        {imagemAtual && (
          <div className="mb-4 text-center">
            <p className="text-gray-600 mb-2">Imagem Atual:</p>
            <img
              src={`http://localhost:5000/uploads/cursos/${imagemAtual}`}
              alt={titulo}
              className="w-60 h-60 object-cover mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* NOVA IMAGEM */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition duration-200"
        />

        {/* BOTÃO */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg 
          transition duration-200 shadow-md hover:shadow-lg"
        >
          Atualizar Curso
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
