import { FC } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import { useProfileStore } from "../../stores/ProfileStore";
import { useChannelStore } from "../../stores/ChannelStore";
import { useMessageStore } from "../../stores/MessageStore";

export const LogoutButton: FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const resetProfile = useProfileStore((state) => state.resetProfile);
  const resetMessages = useMessageStore((state) => state.resetMessages);
  const resetChannels = useChannelStore((state) => state.resetChannels);

  const handleLogout = () => {
    logout();
    resetProfile();
    resetMessages();
    resetChannels();
  };

  return <button onClick={handleLogout}>Logout</button>;
};
