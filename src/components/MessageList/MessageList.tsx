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
  const subscribeToMessages = useMessageStore(
    (state) => state.subscribeToMessages
  );
  const currentSubscription = useMessageStore(
    (state) => state.currentSubscription
  );

  useEffect(() => {
    if (channel === null) {
      return;
    }

    getMessages(channel.id);

    subscribeToMessages(channel.id);

    if (currentSubscription !== null) {
      return () => {
        console.log(`unsubscribing from ${channel?.id}`);
        currentSubscription.unsubscribe();
      };
    }
  }, [channel]);

  if (channel === null) {
    return <div>No channel selected</div>;
  }

  return (
    <>
      <h3 className="text-2xl">{channel.name}</h3>
      <ul>
        {messages?.[channel.id]?.map((message) => (
          <li key={message.id}>
            <Message message={message} />
          </li>
        ))}
      </ul>
    </>
  );
};
