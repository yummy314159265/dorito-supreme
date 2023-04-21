import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMessageStore } from "../../stores/MessageStore";
import { Message } from "../../types/models/Message";
import { Channel } from "../../types/models/Channel";
import { Input } from "../../styled/Input/Input";

export interface SendMessageFormProps {
  channel: Channel | null;
  userId: string | null;
}

export const SendMessageForm: FC<SendMessageFormProps> = ({
  channel,
  userId
}) => {
  const sendMessage = useMessageStore((state) => state.sendMessage);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    if (channel === null || userId === null) {
      return;
    }

    const message: Partial<Message> = {
      channel_id: channel.id,
      sender_profile_id: userId,
      content: data["content"]
    };

    sendMessage(message);
  };

  if (channel === null) {
    return <div>Please select a channel or be gay</div>;
  }

  if (userId === null) {
    return <div>Please log in</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="sendMessage">Send Message</label>
      <Input
        placeholder="Im gay"
        type="text"
        {...register("content", { required: true })}
      />
      <button type="submit">Send</button>
      {errors["required"] && <span>Required</span>}
    </form>
  );
};
