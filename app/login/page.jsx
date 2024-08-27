import React from "react";
import Login from "../components/Login";
import Link from "next/link";

function LoginPage() {
  return (
    <>
    <div className="bg-blue-900 w-screen h-screen flex items-center font-bold">
    <div className="text-center w-full flex items-center flex-col">
      <div className="flex flex-col ml-4">
        <Login />
        <p className="my-3">
          Dont have an account?
          <Link href="register" className="mx-2 underline text-blue-600">
            Register
          </Link>
        </p>
      </div>
      </div>
      </div>
    </>
  );
}

export default LoginPage;
