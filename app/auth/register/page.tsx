"use client";
import axios, { axiosAuth } from "@/lib/axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  role: string;
}

interface Alert {
  status: string;
  message: string;
}

const RegisterPage = () => {
  const [userRegister, setUserRegister] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const router = useRouter();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  console.log(userRegister);
  const [alert, setAlert] = useState<Alert>({
    status: "",
    message: "",
  });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      console.log("registerData");
      const res = await axios.post("/user/newuser/register", userRegister);
      console.log(res.data);
      // await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   body: JSON.stringify(registerData)
      // })
      setAlert({ status: "success", message: "Signup successfully" });
      setUserRegister({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
      });
      router.push("/");
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message:error.message });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        {alert.message && (
          <div
            style={{
              color: alert.status === "success" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {alert.status === "success" ? "✅" : "❌"} {alert.message}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full p-2 border rounded text-gray-600"
              name="username"
              onChange={onChange}
              type="text"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full p-2 border rounded text-gray-600"
              name="email"
              onChange={onChange}
              type="email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-2 border rounded text-gray-600"
              name="password"
              onChange={onChange}
              type="password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Re-Password
            </label>
            <input
              className="w-full p-2 border rounded text-gray-600"
              name="cpassword"
              onChange={onChange}
              type="password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <input
              className="w-full p-2 border rounded text-gray-600"
              name="role"
              onChange={onChange}
              type="text"
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold mb-6"
            type="submit"
          >
            Create account
          </button>
        </form>
        <div className="mb-6">
          Already have an account? <Link href="/auth/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
