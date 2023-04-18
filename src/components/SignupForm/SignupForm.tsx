import { FC } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../styled/Input";

export const SignupForm: FC = () => {
  const createUser = useAuthStore((state) => state.createUser);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    createUser({
      email: data?.["email"],
      password: data?.["password"],
      username: data?.["username"]
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email: </label>
        <Input
          placeholder="Email"
          type="text"
          {...register("email", { required: true })}
        />
        {errors?.["email"] && <span>Required</span>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors?.["password"] && <span>Required</span>}
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <Input
          placeholder="Username"
          type="text"
          {...register("username", { required: true })}
        />
        {errors?.["username"] && <span>Required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
