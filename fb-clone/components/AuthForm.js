import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState({ day: "1", month: "Jan", year: "2000" });
  const [gender, setGender] = useState("Male");

  const router = useRouter();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setSurname("");
    setDob({ day: "1", month: "Jan", year: "2000" });
    setGender("Male");
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await auth.signInWithEmailAndPassword(email, password);
        resetForm();
        router.push("/");
      } else {
        const userCred = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCred.user;

        await db.collection("users").doc(user.uid).set({
          firstName,
          surname,
          email,
          dateOfBirth: `${dob.day}-${dob.month}-${dob.year}`,
          gender,
          createdAt: new Date(),
        });

        alert("Account created successfully!");
        resetForm();
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleAuth} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold">{isLogin ? "Login" : "Create a new account"}</h2>

      {!isLogin && (
        <>
          <div className="flex space-x-2">
            <input
              className="w-1/2 p-2 border rounded"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="w-1/2 p-2 border rounded"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-2">
            <select
              className="w-1/3 p-2 border rounded"
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
            >
              {[...Array(31)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="w-1/3 p-2 border rounded"
              value={dob.month}
              onChange={(e) => setDob({ ...dob, month: e.target.value })}
            >
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <select
              className="w-1/3 p-2 border rounded"
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
            >
              {Array.from({ length: 100 }, (_, i) => 2025 - i).map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            {["Female", "Male", "Custom"].map((g) => (
              <label key={g} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                />
                <span>{g}</span>
              </label>
            ))}
          </div>
        </>
      )}

      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="bg-green-600 w-full text-white p-2 rounded">
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p
        onClick={() => {
          setIsLogin(!isLogin);
          resetForm(); 
        }}
        className="text-blue-500 cursor-pointer text-sm text-center"
      >
        {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
      </p>
    </form>
  );
}
