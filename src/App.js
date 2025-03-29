import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {Route, Routes, } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sidebar from './components/Home Comp/Sidebar';
import Conversation from './components/Home Comp/Conversation';
import MessageContainer from './components/Messages/MessageContainer';

function App() {

  return (
    // <div className="p-4 h-screen flex items-center justify-center app">
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/messages' element={<MessageContainer />} />
    </Routes>
    // </div>
  );
}

export default App;
