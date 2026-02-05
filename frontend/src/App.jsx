import Home from "./pages/Home";
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import CreateCourse from "./components/crud/FormCourses";
import EditCourse from "./components/crud/EditCourses";
import AllCourses from "./pages/Courses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cursos/novo" element={<CreateCourse />} />
      <Route path="/cursos/editar/:id" element={<EditCourse />} />
      <Route path="/cursos" element={<AllCourses />} />
    </Routes>
  )
}

export default App
