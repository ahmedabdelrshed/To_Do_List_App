import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { React, useRef, useState } from "react";
function App() {
  // put the tasks in the localStorage if found
  const [tasks, settasks] = useState(
    JSON.parse(localStorage.getItem("Tasks"))
      ? JSON.parse(localStorage.getItem("Tasks"))
      : []
  );
  const inputTask = useRef(null); // reference for the input of the task

  function addTask(e) {
    e.preventDefault();
    let value = inputTask.current.value.trim();
    if (value === "") return;
    let newTask = { value, completed: false };
    let newTasks = [...tasks, newTask];
    settasks(newTasks);
    localStorage.setItem("Tasks", JSON.stringify(newTasks)); // Update on LocalStorage
    inputTask.current.value = "";
  }

  const done = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    settasks(newTasks);
    localStorage.setItem("Tasks", JSON.stringify(newTasks)); // Update on LocalStorage
  };

  const deleteTask = (index) => {
    const newTasksd = [...tasks];
    newTasksd.splice(index, 1);
    settasks(newTasksd);
    localStorage.setItem("Tasks", JSON.stringify(newTasksd)); // Update on LocalStorage
  };
  return (
    <div className="container">
      <h2>To Do List app</h2>
      <form className="inputTask">
        <input
          type="text"
          placeholder="Enter Your Task"
          ref={inputTask}
        ></input>
        <button onClick={addTask}>+</button>
      </form>
      <div className="Lists">
        <span>Your Tasks</span>
        <ul>
          {tasks.map(({ value, completed }, index) => (
            <li>
              <input
                type="checkbox"
                onChange={() => {
                  done(index);
                }}
                checked={completed}
              />
              <p className={completed ? "done" : ""}>{value}</p>
              <i
                className="fa-regular fa-trash-can"
                onClick={() => {
                  deleteTask(index);
                }}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
