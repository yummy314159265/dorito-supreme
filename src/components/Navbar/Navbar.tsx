import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { useProfileStore } from "../../stores/ProfileStore";
import { useMessageStore } from "../../stores/MessageStore";
import { useChannelStore } from "../../stores/ChannelStore";

export const Navbar: FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);
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

  return (
    <div className="flex justify-between">
      <Link to="/">Home</Link>
      {!authenticated && (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {authenticated && (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};
