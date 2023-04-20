import { FC } from "react";
import { useChannelStore } from "../../stores/ChannelStore";
import { ChannelSearchInfo } from "../ChannelSearchInfo/ChannelSearchInfo";

export interface ChannelSearchListProps {
  userId: string | null;
}

export const ChannelSearchList: FC<ChannelSearchListProps> = ({ userId }) => {
  const searchedChannels = useChannelStore((state) => state.searchedChannels);

  if (userId === null) {
    return <div>Please Log In</div>;
  }

  return (
    <ul>
      {searchedChannels?.map((channel) => {
        return (
          <li key={channel.id}>
            <ChannelSearchInfo channel={channel} userId={userId} />
          </li>
        );
      })}
    </ul>
  );
};
