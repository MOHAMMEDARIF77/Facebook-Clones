import { signIn } from "next-auth/react";
import Image from "next/image";
import AuthForm from "./AuthForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <Image
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        alt="Facebook logo"
      />
      <button
        onClick={() => signIn("google")}
        className="p-3 bg-blue-500 text-white rounded-full"
      >
        Login with Google
      </button>

      {/* Firebase Email/Password Auth */}
      <AuthForm />
    </div>
  );
};

export default Login;
