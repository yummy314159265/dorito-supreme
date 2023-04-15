import { FC } from "react";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { useAuthStore } from "../../stores/AuthStore";

export const Signup: FC = () => {
  const signupStatus = useAuthStore((state) => state.signupStatus);

  return (
    <>
      <SignupForm></SignupForm>
      {signupStatus === "loading" && <div>Signing up...</div>}
      {signupStatus === "success" && <div>Check email for verification</div>}
    </>
  );
};
