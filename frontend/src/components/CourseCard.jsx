import "../styles/courses.css";

function CourseCard({ curso }) {
  return (
    <div className="course-card">
      <img
        src={`http://localhost:5000/static/${curso.imagem}`}
        alt={curso.titulo}
      />

      <h2>{curso.titulo}</h2>
      <p>{curso.descricao}</p>

      <span className="price">
        R$ {curso.preco.toFixed(2)}
      </span>

      <button>Comprar</button>
    </div>
  );
}

export default CourseCard;
