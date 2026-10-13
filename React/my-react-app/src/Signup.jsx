import { useState } from "react";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:4000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Signup Response:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Signup successful!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log("Signup Error:", error);

      alert(error.message);
    }
  };

  return (
    <div className="login-card">

      <h1>Create Account</h1>

      <p>Signup using your email</p>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;