import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:4000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(`Welcome ${data.user.name}`);

    } catch (error) {

      console.log("Login Error:", error);

      alert(error.message);
    }
  };

  return (
    <div className="login-card">

      <h1>Welcome Back 👋</h1>

      <p>Login using your email</p>

      <form onSubmit={handleLogin}>

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
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;