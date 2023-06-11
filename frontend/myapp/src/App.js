
import './App.css';
import TaskList from './components/taskList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<TaskList/>} ></Route>
          <Route path="editTask" element = {<EditTask/>} ></Route>
        </Routes>
      </BrowserRouter>  
      
    </div>
  );
}

export default App;
