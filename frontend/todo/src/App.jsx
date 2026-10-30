import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);


  // add todo ka logic h agar mujhe yaha par koi extra space user ke trough diya jaye 
  // to hum usko trim ke method se hata lene and check karunga ki koi "" 
  // hai ya nhi agar h to return; simple 
  
  const addTodo = () => {
    if (task.trim() === ""){
         return;
    } 
    //  fir setTodo karunga to sabse phle id:date.now means current time ke basis par add karunga 
    // text hoga task 
    // completed : to start me hum false karenge  kyuki koi task nhi h 

    setTodos([
      ...todos,
      { id: Date.now(),
        text: task, 
        completed: false,
       }
    ]);

    // agar task set ho jata h to fir task ko reset kar dunga empty se

    setTask("");
  };

  //  use karunga toggle because task ko complte and imcomplte check karne ke liye 
  // toggleTodo ke trough react state update kar rha hu 
  // then pura todo list ko map ke through check karega 
  // then check karenge ki barabar agar barabar hua to statsus badlega 
  // agar barabar nhi h to waise hi rahega 

  const toggleTodo = (id) => {   
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
//  ye hai task deletion ka logic 
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


// connection between frontend and backend
const App = () => {
  async function getData() {
    let res = await axios.get("http://localhost:5000/test");
    console.log(res.data);
  }

  useEffect(() => {
    getData();
  }, []);
};
  return (
    <div className="app">
      <div className="todo-container">

        {/* header hai  */}

        <h1>Todo List</h1>
        {/* yaha par input le rhe hai task ke liye  */}
        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            //event laga kar task add kiya hu 
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />

          <button onClick={addTodo}>Add</button>
        </div>

        {/* agar task ka length zero h to paragraph add kar dunga */}

        {todos.length === 0 ? (
          <p className="empty">No tasks added yet. Add one </p>
        ) : (
          // list creation 
          
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}> 
                <span
                  className={todo.completed ? "completed" : ""} // 
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>


                  {/* delete button hai agar mai koi task delete karna chahta hu to   */}
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
          {/* task  Count hai kar rha hu kitna task add hua h  */}
        <p className="count">
          Tasks Count : {todos.length}
        </p>
      </div>
    </div>
  );
}

export default App;