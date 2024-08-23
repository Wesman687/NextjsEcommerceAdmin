"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState();
  const [verified, setVerified] = useState();
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  const clickToVerify = async () => {
    if (!token) {      
     console.log(session)
     const email = session.user.email
     console.log(email)

    }
    if (token.length > 0) {
      verifyUser();
    }
  };
  const verifyUser = async () => {
    try {
        const response = await axios.post("/api/verifyemail", { token })
        if (response.status == 201) {
          setVerified(true)

        }
    } catch (error) {
      console.log(error);
    }    
  };
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center font-bold">
      <div className="text-center w-full flex items-center flex-col">
        <h1 className="text-white text-3xl">Verify Email</h1>
        <h2 className="text-white text-2xl my-2">
          {token ? `${token}` : "Please check your email for verification link"}
        </h2>
        {!verified ? (
          <>
            <button className="p-2 rounded-md text-l text-blue-600 my-2 bg-yellow-200" onClick={clickToVerify}>{token > 0 ? "Click to Verify" : "Send New Link"}</button>
          </>
        ) : (
          <>
            <div className="flex items-center flex-col">
              <h1 className="text-xl my-2 text-white">Successfully verified</h1>
              <h1 className="text-xl my-2 text-blue-600"><Link href="/">Login</Link></h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
