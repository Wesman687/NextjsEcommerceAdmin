"use client";

import Login from "./Login";
import Link from "next/link";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { isAdminRequest } from "../actions";
import Logo from "./Logo";
export default function Layout({ children }) {
  const adminEmails = ["WESMAN687@GMAIL.COM"];
  const router = useRouter();
  const [session, setSession] = useState();
  const [show, setShowNav] = useState(false);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await axios.get("/api/user");
      const adminRequest = await isAdminRequest();
      if (adminRequest) {
        setSession(res.data.user);
      } else {
        router.push("/login");
      }
    };
    fetchSession();
  }, []);
  return (
    <>
      <div className="bg-blue-900 min-h-screen w-screen flex font-bold flex-col p-1">
        <div className="flex md:hidden items-center text-white w-full p-3">
        <button          
          onClick={() => setShowNav(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
        <Logo />
        </div>
        </div>
        <div className="flex">
          <Nav show={show} />
          <>
            <div className="bg-[#fbfafd] flex-grow m-2 md:ml-0 rounded-lg p-4 shadow-lg shadow-black md:h-[95vh]">
              {children}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
