import { FC, useEffect } from "react";
import { AuthForm } from "../../AuthForm/AuthForm";
import { useAuthStore } from "../../../stores/AuthStore";

export const Auth: FC = () => {
  const signupStatus = useAuthStore((state) => state.signupStatus);

  useEffect(() => {});

  return (
    <>
      <AuthForm></AuthForm>
      {signupStatus === "loading" && <div>Signing up...</div>}
      {signupStatus === "success" && <div>Check email for verification</div>}
    </>
  );
};
