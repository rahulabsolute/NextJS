"use client";
import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Space, Input } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import GetTask from "./components/GetTask";

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Page() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [task, setTask] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setToken(token);
    }
  }, [router]);

  if (!token) {
    return null;
  }

  const addTask = async () => {
    if (!task) {
      return;
    }
    try {
      const response = await axios.post(
        "https://dummyjson.com/todos/add",
        {
          todo: task,
          completed: false,
          userId: 1,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="todo_container">
      <div>
        <div className="add_task">
          <Input
            className="text_input"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                      colors1
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                      colors1
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={addTask} type="primary">
                Add Task
              </Button>
            </ConfigProvider>
          </Space>
        </div>
        <GetTask />
      </div>
    </div>
  );
}

export default Page;
