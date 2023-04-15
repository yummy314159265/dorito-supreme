import { FC, useEffect } from "react";
import { useProfileStore } from "../../stores/ProfileStore";
import { useAuthStore } from "../../stores/AuthStore";

export const Home: FC = () => {
  const profile = useProfileStore((state) => state.profile);
  const getProfile = useProfileStore((state) => state.getProfile);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    console.log(userId);
    
    if (userId === null) {
      return;
    }

    getProfile(userId);
  }, [userId]);

  return <div>Welcome, {profile?.username ?? "guest"}</div>;
};
