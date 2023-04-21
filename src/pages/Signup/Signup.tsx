import { FC } from "react";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { useAuthStore } from "../../stores/AuthStore";

export const Signup: FC = () => {
  const createUserStatus = useAuthStore((state) => state.statuses)?.createUser;

  return (
    <>
      <SignupForm></SignupForm>
      {createUserStatus === "loading" && <div>Signing up...</div>}
      {createUserStatus === "success" && (
        <div>Check email for verification</div>
      )}
    </>
  );
};
