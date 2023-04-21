import { FC, useEffect } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import { LoginForm } from "../../components/LoginForm/LoginForm";

export const Login: FC = () => {
  const loginStatus = useAuthStore((state) => state.loginStatus);
  const loginError = useAuthStore((state) => state.loginError);
  const authenticated = useAuthStore((state) => state.authenticated);

  useEffect(() => {
    if (authenticated === true) {
      window.location.assign("/");
    }
  }, [authenticated]);

  return (
    <>
      <LoginForm></LoginForm>
      {loginStatus === "loading" && <div>Logging in...</div>}
      {loginStatus === "success" && authenticated && <div>Success!</div>}
      {loginStatus === "error" && <div>Error: {loginError} </div>}
    </>
  );
};
