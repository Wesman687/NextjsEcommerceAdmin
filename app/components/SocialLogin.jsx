'use client'
import React from "react";
import { doCredentialLogin, doSocialLogin } from "../actions";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter()
  async function guestLogin() {    
    const email = 'Guest@guest.com'
    const password = "Guest1234567"
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await doCredentialLogin(formData);
      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form action={doSocialLogin}>
        <button
          className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
          type="submit"
          name="action"
          value="google"
        >
          Sign in With Google
        </button>
      </form>
      <button onClick={guestLogin} className="bg-orange-400 text-white p-1 rounded-md m-1 text-lg">
        Sign in as Guest
      </button>
    </div>
  );
}
