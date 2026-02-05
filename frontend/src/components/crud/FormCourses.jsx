import { useState } from "react";
import api from "../../services/api";
import Navbar from "../Navbar";

function CreateCourse() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("curso-online");
    const [status, setStatus] = useState("ativo");
    const [imagem, setImagem] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ upload da imagem
            const formData = new FormData();
            formData.append("image", imagem);

            const uploadRes = await api.post("/cursos/upload", formData);
            const imageName = uploadRes.data.filename;

            // 2️⃣ criar curso
            await api.post("/cursos", {
                titulo,
                descricao,
                valor: Number(valor),
                tipo,
                status,
                imagem_url: imageName,
            });

            alert("Curso cadastrado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar curso");
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto my-6 bg-white shadow-xl rounded-2xl flex flex-col gap-6 p-8"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Cadastrar Curso
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

                {/* IMAGEM */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files[0])}
                    required
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
                    Cadastrar Curso
                </button>
            </form>
        </div>

    );
}

export default CreateCourse;
