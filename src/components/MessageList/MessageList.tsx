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
  const statuses = useMessageStore((state) => state.statuses);

  useEffect(() => {
    if (
      channel === null ||
      (statuses[channel.id] !== undefined && statuses[channel.id] !== "pending")
    ) {
      return;
    }

    getMessages(channel.id);
  }, [channel]);

  if (channel === null) {
    return <div>No channel selected</div>;
  }

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
