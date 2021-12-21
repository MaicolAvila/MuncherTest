import React from "react";
import "./Home.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoCompleteState, todoContentState } from "../../state/todoState";
import TodoContent from "../../types/todoContent";
import { Link } from "react-router-dom";

export default function Home(props: TodoContent) {
  const { description, title, id } = props;
  const [isComplete, setIsComplete] = useRecoilState(
    todoCompleteState(props.id)
  );
  const setTodos = useSetRecoilState(todoContentState);
  const toggleComplete = () => setIsComplete((prevState) => !prevState);
  const deleteTodo = () =>
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  return (
    <div className="Home column">
      {/* <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div>
        <button onClick={toggleComplete}>
          {isComplete ? "Not complete" : "Complete"}
        </button>
        <button onClick={deleteTodo}>Delete</button>
      </div> */}
      <div className="header">
        <div className="title">Lista de desarrolladores</div>
      </div>
      <div className="column body">
        <div className="frontends col column">
          <div className="title">Frontends</div>
          <div className="list"></div>
        </div>
        <div className="backends col column">
          <div className="title">Backends</div>
          <div className="list"> </div>
        </div>
      </div>
      <div className="footer row">
        <Link to="create" className="btn1">
          Crear
        </Link>
      </div>
    </div>
  );
}
