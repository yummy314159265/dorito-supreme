import { FC, useEffect } from "react";
import { useProfileStore } from "../../stores/ProfileStore";
import { useAuthStore } from "../../stores/AuthStore";
import { CreateChannelForm } from "../../components/CreateChannelForm/CreateChannelForm";
import { ChannelList } from "../../components/ChannelList/ChannelList";
import { useChannelStore } from "../../stores/ChannelStore";
import { MessageList } from "../../components/MessageList/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm/SendMessageForm";

export const Home: FC = () => {
  const getProfile = useProfileStore((state) => state.getProfile);
  const userId = useAuthStore((state) => state.userId);
  const profile = useProfileStore((state) => state.profiles).find(
    (p) => p.id === userId
  );
  const authenticated = useAuthStore((state) => state.authenticated);
  const currentChannel = useChannelStore((state) => state.currentChannel);

  useEffect(() => {
    if (userId === null) {
      return;
    }

    console.log("checking for rerenders");

    getProfile(userId);
  }, [userId]);

  return (
    <>
      <div>Welcome, {profile?.username ?? "guest"}</div>
      {authenticated && <CreateChannelForm />}
      <ChannelList />
      <MessageList channel={currentChannel} />
      <SendMessageForm userId={userId} channel={currentChannel} />
      <div className="border-b"></div>
    </>
  );
};
