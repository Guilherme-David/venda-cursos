import "../index.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex h-20 w-full justify-between bg-gray-200 shadow-lg shadow-gray-400/20 items-center p-6">
      
      <div className="cursor-pointer text-2xl text-slate-800 text-shadow-md text-shadow-slate-500 font-bold mb-2 " >
        <Link to="/"> The Vision - Cursos </Link>
      </div>

      <nav className="flex justify-end items-center gap-5 mx">
        <Link to="/" className="relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full ">
          Home
        </Link>

        <Link to="/cursos" className="relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full">
          Cursos
        </Link>

        <Link to="/cadastro-cursos" className="relative font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:after:w-full">
          Cadastrar Cursos
        </Link>
      </nav>

    </header>
  );
}

export default Navbar;
