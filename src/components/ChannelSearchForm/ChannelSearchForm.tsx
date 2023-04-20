import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useChannelStore } from "../../stores/ChannelStore";
import { Input } from "../../styled/Input";

export const ChannelSearchForm: FC = () => {
  const searchChannels = useChannelStore((state) => state.searchChannels);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    searchChannels(data["channelName"]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="channelName">Enter a channel</label>
      <Input
        placeholder="Gay search"
        type="text"
        {...register("channelName", { required: true })}
      />
      {errors?.["channelName"] && <span>Required</span>}
      <button type="submit">Search</button>
    </form>
  );
};
