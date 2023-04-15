import { FC } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import { FieldValues, useForm } from "react-hook-form";

export const LoginForm: FC = () => {
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    login({ email: data?.["email"], password: data?.["password"] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          placeholder="email"
          type="text"
          {...register("email", { required: true })}
        />
        {errors?.["email"] && <span>Required</span>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors?.["password"] && <span>Required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
