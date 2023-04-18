import { FC, MouseEventHandler } from "react";
import { Channel as ChannelEntity } from "../../types/models/Channel";
import { useChannelStore } from "../../stores/ChannelStore";

export interface ChannelProps {
  channel: ChannelEntity;
}

export const Channel: FC<ChannelProps> = ({ channel }) => {
  const changeCurrentChannel = useChannelStore(
    (state) => state.changeCurrentChannel
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    changeCurrentChannel(channel);
  };

  return <button onClick={onClick}>{channel.name}</button>;
};
