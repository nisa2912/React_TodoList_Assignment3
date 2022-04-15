import './App.css';
import {useState} from 'react';

function App() {

  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);

  const createTodoHandler = () => {
    if (todoTitle !== '') {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        isComplete: false
      };

      setTodoList([...todoList, newTodo]);
      setTodoTitle("");

    } else {
      alert("Enter a valid todo item")
    }
  }

  const deleteTodoHandler = (id) => {

    //all the items returned except the item the user wanted to be deleted
    const newTodoList = todoList.filter((item) => item.id !== id);


    setTodoList(newTodoList);

  }

  const editTodoHandler = (id) => {
    const tobeEdited = todoList.find((item) => item.id === id);
    setEditMode(true);
    setEditableTodo(tobeEdited);
    setTodoTitle(tobeEdited.title);

  }

  const updateTodoHandler = () => {

    setTodoList(todoList.map((todo) => {
      if(todo.id === editableTodo.id){
        todo.title = todoTitle;
        return todo;
      }
        return todo;
      
    }))

    setEditMode(false);
    setTodoTitle("");
    setEditableTodo(null);  

  }

  return (
    <div className ="App">
      <div className ="todo-app">
        <input type="text" value={todoTitle} onChange = {(event) => setTodoTitle(event.target.value)} />
        <button onClick={() =>{ editMode ? updateTodoHandler() : createTodoHandler()}}>
          {editMode ? "Edit todo" : "Add todo"}
        </button>
        <ul className='todo-list'>
          {todoList.map(todo => 
            <li>
              <span>{todo.title}</span>
              <button onClick = {() => editTodoHandler(todo.id)}>
              Edit
              </button>
              <button onClick={() => deleteTodoHandler(todo.id)}>
               Delete
              </button>
            </li>

            )}
        </ul>

      </div>
    </div>
  );
}

export default App;
