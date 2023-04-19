import { FC, useEffect } from "react";
import { Message as MessageEntity } from "../../types/models/Message";
import { useProfileStore } from "../../stores/ProfileStore";

export interface MessageProps {
  message: MessageEntity;
}

export const Message: FC<MessageProps> = ({ message }) => {
  const profiles = useProfileStore((state) => state.profiles);
  const getProfile = useProfileStore((state) => state.getProfile);
  const username = profiles.find(
    (p) => p.id === message.sender_profile_id
  )?.username;

  useEffect(() => {
    getProfile(message.sender_profile_id);
  }, []);

  return (
    <>
      <p>{username}</p>
      <div>{message.content}</div>
    </>
  );
};
