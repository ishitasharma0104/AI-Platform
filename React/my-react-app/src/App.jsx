import { GoogleLogin } from "@react-oauth/google";
import "./App.css";

function App() {

  const handleGoogleLogin = async (credentialResponse) => {

    try {

      console.log("Google Response:");
      console.log(credentialResponse);

      const credential = credentialResponse.credential;

      console.log("Google Credential:");
      console.log(credential);

   
      const response = await fetch(
        "http://localhost:4000/api/auth/google",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            credential: credential,
          }),
        }
      );

      axios.post('http://localhost:4000/login',credential)

      const data = await response.json();

      console.log("Backend Response:");
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }


      localStorage.setItem("token", data.token);


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(`Welcome ${data.user.name}`);

    } catch (error) {

      console.log("Login Error:", error);

      alert("Google Login Failed");

    }
  };


  const handleGoogleError = () => {

    console.log("Google Login Failed");

    alert("Google Login Failed");

  };


  return (

    <div className="container">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>
          Login with your Google account
        </p>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
        />

      </div>

    </div>

  );
}

export default App;