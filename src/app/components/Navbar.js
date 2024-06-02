"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button as AntButton } from "antd";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return (
    <div className="navbar">
      <Link href="/" className="nav_link">
        To-Do List
      </Link>
      {!token ? (
        <Link href="/login" className="nav_link login">
          <AntButton type="primary">Login</AntButton>
        </Link>
      ) : (
        <div className="nav_link login">
          <AntButton type="primary" onClick={handleLogout}>
            Logout
          </AntButton>
        </div>
      )}
    </div>
  );
}

export default Navbar;
