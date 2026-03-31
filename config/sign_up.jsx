import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("สมัครสมาชิกสำเร็จ ✅");
        setForm({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      setMessage("ไม่สามารถเชื่อมต่อ Server ได้");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          สร้างบัญชีผู้ใช้
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstname"
            placeholder="ชื่อ"
            value={form.firstname}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="text"
            name="lastname"
            placeholder="นามสกุล"
            value={form.lastname}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="อีเมล"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-semibold"
          >
            สมัครสมาชิก
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}