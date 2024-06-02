import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button as AntButton, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function GetTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTask();
  }, []);

  async function getTask() {
    try {
      const response = await axios.get("https://dummyjson.com/todos/user/1");
      setTasks(response.data.todos);
    } catch (err) {
      console.log("Server error", err);
    }
  }

  async function updateTask(id, completed) {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: completed,
      });
      console.log(response.data);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (err) {
      console.log("Update failed", err);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
      console.log(response.data);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log("Delete failed", err);
    }
  }

  return (
    <div className="task_container">
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className="task" key={index}>
              <li className="todo_task">
                <Checkbox
                  checked={task.completed}
                  onChange={(e) => updateTask(task.id, e.target.checked)}
                  style={{ fontSize: "20px" }}
                />{" "}
                {task.todo}
              </li>
              <div>
                <AntButton type="primary" onClick={() => deleteTask(task.id)}>
                  <DeleteOutlined />
                </AntButton>
              </div>
            </div>
          ))
        ) : (
          <li className="todo_task">No tasks available</li>
        )}
      </ul>
    </div>
  );
}

export default GetTask;
