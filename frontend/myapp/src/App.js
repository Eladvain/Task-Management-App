
import './App.css';
import TaskList from './components/taskList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTask from './components/EditTask';
import LogIn from './components/LogIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element = {<TaskList/>} ></Route>
          <Route path="/" element = {<LogIn/>} ></Route>
          <Route path="editTask" element = {<EditTask/>} ></Route>
        </Routes>
      </BrowserRouter>  
      
    </div>
  );
}

export default App;
