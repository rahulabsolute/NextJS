"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <center className="login_container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </center>
  );
};

export default Page;
