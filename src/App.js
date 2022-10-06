import React, { useState } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([
      {
          id: 1,
          title: "리액트 공부하기",
          isDone: false,
      },
    ]);
  const Layout = (props) => {
    return <div className="layout">{props.children}</div>;
  };
  let number = 2;
  function Form({ setTodos, todos }) {
    const initialState = {
      id: 0,
      title: "",
      body: "",
      isDone: false,
    };
  
    console.log(todos);
  
    const [todo, setTodo] = useState(initialState);
    const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setTodo({ ...todo, [name]: value });
    };
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      if (todo.title.trim() === "" || todo.body.trim() === "") return;
      setTodos([...todos, { ...todo, id: number }]);
      setTodo(initialState);
      number++;
    };
  
    return (
      <form onSubmit={onSubmitHandler} className="add-form">
        <div className="input-group">
          <input
            type="text"
            name="title"
            value={todo.title}
            className="add-input input-body"
            onChange={onChangeHandler}
          />
        </div>
        <button className="add-button">추가하기</button>
      </form>
    );
  }

  function Todo({ todo }) {
    return (
        <div className="todo-container">
            <div>
                <div>{todo.body}</div>
            </div>
        </div>
    );
}

function List({ todos, setTodos}) {
  const onEditHandler = (todoId) => {
      const newTodos = todos.map((todo)=> {
          if (todo.id === todoId) {
              return {
                  ...todo,
                  isDone: !todo.isDone,
              };
          } else {
              return { ...todo };
          }
      });

      setTodos(newTodos);
  };

  return (
    <div className="list-container">                      
    <h2 className="list-title">Todo List</h2>
    <div className="list-wrapper">
        {todos.map((todo) => {
            if (todo.isDone) {
                return (
                    <Todo
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                    onEditHandler={onEditHandler}                            
                    />
                );
            } else {
                return null;
            }
              })}
          </div>
      </div>
  );
}

  return (
    <Layout>
      <Form setTodos={setTodos} todos={todos} />
      <List todos={todos} setTodos={setTodos} />           
      </Layout>
  );
}

export default App;
