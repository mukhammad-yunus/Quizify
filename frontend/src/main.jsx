import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import Dashboard from './page/Dashboard.jsx';
import Quiz from './page/Quiz.jsx';
import CreateQuiz from './page/CreateQuiz.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/quiz/:id' element={<Quiz/>}/>
      <Route path='/quiz/create' element={<CreateQuiz/>}/>
    </Routes>
  </BrowserRouter>,
)
