"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState();
  const [verified, setVerified] = useState();
  const [sendAllowed, setSendAllow] = useState(true)
  const [id, setId] = useState()
  useEffect(() => {
    const windowId = window.location.search.split('uid=')[1]
    const urlToken = window.location.search.split("token=")[1];
    setToken(urlToken || "");
    setId(windowId || "")
  }, []);
  const clickToVerify = async () => {    
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
  const resendEmail = async () =>{
    if (id) {    
      console.log(id)  
      const response = await axios.post('/api/user', {id})          
 
     }
  }
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center font-bold">
      <div className="text-center w-full flex items-center flex-col">
        <h1 className="text-white text-3xl">Verify Email</h1>
        <h2 className="text-white text-2xl my-2">
          {token ? `${token}` : "Please check your email for verification link"}
        </h2>
        {!verified ? (
          <>
            {token > 0 && <button className="p-2 rounded-md text-l text-blue-600 my-2 bg-yellow-200" onClick={()=>{
              clickToVerify()              
              
              }}>"Click to Verify"</button>}
              <button className="p-2 rounded-md text-l text-white my-2 bg-green-400" onClick={()=>{4
              resendEmail()              
              
              }}>{(sendAllowed) ? "Resend Email" : `..secs til you can send again`}</button>
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
