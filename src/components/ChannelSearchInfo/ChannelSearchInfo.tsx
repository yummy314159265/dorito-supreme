import { FC, useEffect } from "react";
import { Channel } from "../../types/models/Channel";
import { useProfileStore } from "../../stores/ProfileStore";
import { useChannelStore } from "../../stores/ChannelStore";

export interface ChannelSearchInfoProps {
  channel: Channel;
  userId: string;
}

export const ChannelSearchInfo: FC<ChannelSearchInfoProps> = ({
  channel,
  userId
}) => {
  const profiles = useProfileStore((state) => state.profiles);
  const getProfile = useProfileStore((state) => state.getProfile);
  const joinChannel = useChannelStore((state) => state.joinChannel);
  const ownerUsername = profiles.find(
    (p) => p.id === channel.owner_id
  )?.username;

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    joinChannel({ channel_id: channel.id, profile_id: userId });
  };

  useEffect(() => {
    getProfile(channel.owner_id);
  }, [channel]);

  return (
    <div>
      <button onClick={onClick}>{channel.name}</button>
      <p>Owned by {ownerUsername}</p>
    </div>
  );
};
