import { FC, useEffect } from "react";
import { useProfileStore } from "../../../stores/ProfileStore";
import { useAuthStore } from "../../../stores/AuthStore";

export const Home: FC = () => {
  const profile = useProfileStore((state) => state.profile);
  const getProfile = useProfileStore((state) => state.getProfile);
  const userId = useAuthStore((state) => state.userId);

  console.log(profile);

  useEffect(() => {
    getProfile(userId ?? "");
  }, []);

  return <div>Welcome, {profile?.username ?? "guest"}</div>;
};
