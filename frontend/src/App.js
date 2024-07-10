import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Editor from './pages/Editor';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  return (
   <>

<Routes>
  <Route path="/" element={<Homepage />}/>
  <Route path="*" element={<NotFound />} />
  <Route path="/about" element={<About/>}/>
  <Route path="/editor" element={<Editor/>}/>
  <Route path="/dashboard" element={<AdminDashboard/>}/>


 
</Routes>
   </>
  );
}

export default App;
