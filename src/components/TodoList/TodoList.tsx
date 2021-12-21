import React from "react";
import { useRecoilValue } from "recoil";
import { todoContentState } from "../../state/todoState";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const todos = useRecoilValue(todoContentState);
  return (
    <div>
      {todos.map((todoProps) => (
        <TodoItem {...todoProps} key={todoProps.id} />
      ))}
    </div>
  );
}
