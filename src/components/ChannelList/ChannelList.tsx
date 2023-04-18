import { FC, useEffect } from "react";
import { useChannelStore } from "../../stores/ChannelStore";
import { Channel } from "../Channel/Channel";

export const ChannelList: FC = () => {
  const getAllChannels = useChannelStore((state) => state.getAllChannels);
  const allChannels = useChannelStore((state) => state.allChannels);

  useEffect(() => {
    getAllChannels();
  }, []);

  return (
    <>
      <h3>All Channels</h3>
      <ul>
        {allChannels.map((channel) => (
          <li>
            <Channel channel={channel} />
          </li>
        ))}
      </ul>
    </>
  );
};
