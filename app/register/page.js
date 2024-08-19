import React from "react";
import RegistrationForm from "../components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center font-bold">
      <div className="text-center w-full flex items-center flex-col">
        <RegistrationForm />
      </div>
    </div>
  );
}
