import { FC } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import { FieldValues, useForm } from "react-hook-form";
import { useChannelStore } from "../../stores/ChannelStore";
import { Input } from "../../styled/Input";

export const CreateChannelForm: FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);
  const userId = useAuthStore((state) => state.userId);
  const createChannel = useChannelStore((state) => state.createChannel);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    if (userId === null) {
      return;
    }

    createChannel({ name: data?.["name"], owner_id: userId });
  };

  if (authenticated === false) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Create a channel: </label>
      <Input
        placeholder="name"
        type="text"
        {...register("name", { required: true })}
      />
      {errors?.["name"] && <span>Required</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
