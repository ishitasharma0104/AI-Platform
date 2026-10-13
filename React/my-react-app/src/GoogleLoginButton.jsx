import { GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {

  const handleGoogleLogin = async (credentialResponse) => {

    try {

      console.log(
        "Google Response:",
        credentialResponse
      );

      const credential =
        credentialResponse.credential;

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


      const data = await response.json();

      console.log(
        "Backend Response:",
        data
      );

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(`Welcome ${data.user.name}`);

    } catch (error) {

      console.log(
        "Google Login Error:",
        error
      );

      alert(error.message);
    }
  };


  const handleGoogleError = () => {

    console.log("Google Login Failed");

    alert("Google Login Failed");
  };


  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={handleGoogleError}
    />
  );
}

export default GoogleLoginButton;