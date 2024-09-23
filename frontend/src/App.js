import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Editor from './pages/Editor';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Projects } from './pages/Projects';



function App() {
  return (
   <>

<Routes>
  <Route path="/" element={<Homepage />}/>
  <Route path="*" element={<NotFound />} />
  <Route path="/about" element={<About/>}/>
  <Route path="/editor" element={<Editor/>}/>
  <Route path="/dashboard" element={<AdminDashboard/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/projects" element={<Projects/>}/>

  



 
</Routes>
   </>
  );
}

export default App;
