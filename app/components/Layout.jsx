
import Login from "./Login";
import Link from "next/link";
import Nav from "./Nav";

export default function Layout({children}) {
    const session = true
  return (
    <>
      <div className="bg-blue-900 min-h-screen w-screen flex font-bold">
        <Nav />
        {!session ? (
          <>
            <div className="flex flex-col ml-4">
            <Login />
              <p className="my-3">
                Don't have an account?
                <Link href="register" className="mx-2 underline text-blue-600">
                  Register
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
          
            <div className="bg-white flex-grow mt-5 mb-5 mr-5 rounded-lg p-4 shadow-lg shadow-black ">
              {children}
            </div>
          </>
        )}
      </div>
    </>
  );
}
