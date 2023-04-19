import { FC, useEffect } from "react";
import { useMessageStore } from "../../stores/MessageStore";
import { Channel } from "../../types/models/Channel";
import { Message } from "../Message/Message";

export interface MessageListProps {
  channel: Channel | null;
}

export const MessageList: FC<MessageListProps> = ({ channel }) => {
  const messages = useMessageStore((state) => state.messages);
  const getMessages = useMessageStore((state) => state.getMessages);

  useEffect(() => {
    if (channel === null) {
      return;
    }

    getMessages(channel.id);
  }, [channel]);

  console.log(channel?.id);

  if (channel === null) {
    return <div>No channel selected</div>;
  }

  console.log(messages);

  return (
    <ul>
      {messages?.[channel.id]?.map((message) => (
        <li key={message.id}>
          <Message message={message} />
        </li>
      ))}
    </ul>
  );
};
