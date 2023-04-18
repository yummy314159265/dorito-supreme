import { FC, useEffect } from "react";
import { useChannelStore } from "../../stores/ChannelStore";
import { Channel } from "../Channel/Channel";

export const ChannelList: FC = () => {
  const getAllChannels = useChannelStore((state) => state.getAllChannels);
  const getJoinedChannels = useChannelStore((state) => state.getJoinedChannels);
  const allChannels = useChannelStore((state) => state.allChannels);
  const joinedChannels = useChannelStore((state) => state.joinedChannels);

  useEffect(() => {
    getJoinedChannels();
  }, []);

  return (
    <>
      <h3>All Channels</h3>
      <ul>
        {joinedChannels.map((channel) => (
          <li key={channel.id}>
            <Channel channel={channel} />
          </li>
        ))}
      </ul>
    </>
  );
};
