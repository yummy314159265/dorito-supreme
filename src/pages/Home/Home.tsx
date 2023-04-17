import { FC, useEffect } from "react";
import { useProfileStore } from "../../stores/ProfileStore";
import { useAuthStore } from "../../stores/AuthStore";
import { CreateChannelForm } from "../../components/CreateChannelForm/CreateChannelForm";

export const Home: FC = () => {
  const profile = useProfileStore((state) => state.profile);
  const getProfile = useProfileStore((state) => state.getProfile);
  const userId = useAuthStore((state) => state.userId);
  const authenticated = useAuthStore((state) => state.authenticated);

  useEffect(() => {
    console.log(userId);

    if (userId === null) {
      return;
    }

    getProfile(userId);
  }, [userId]);

  return (
    <>
      <div>Welcome, {profile?.username ?? "guest"}</div>
      {authenticated && <CreateChannelForm />}
    </>
  );
};
