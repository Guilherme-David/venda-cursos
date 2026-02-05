import "../index.css"
import Navbar from "../components/Navbar";
import HomeList from "../components/HomeList";
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex min-h-screen bg-linear-to-bl from-slate-900 to-slate-800 gap-20 items-center flex-col pb-24">
      <Navbar />
      <main className="container mx-auto">
        <HomeList />
      </main>
      <Link to="/cursos" className="flex hover:shadow-2xl shadow-sky-300/20 bg-linear-to-bl from-slate-700 to-slate-600 w-2/3 h-80 rounded-2xl justify-center items-center text-5xl text-gray-800 font-semibold cursor-pointer">
        <p className=" hover:text-sky-300 transition-colors duration-200 cursor-pointer -semibold">Veja Nossos Cursos</p>
      </Link>
    </div>
  );
}

export default Home;