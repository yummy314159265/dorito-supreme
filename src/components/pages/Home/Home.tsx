import { FC, useEffect } from "react";
import { useProfileStore } from "../../../stores/ProfileStore";

export const Home: FC = () => {
  const profile = useProfileStore((state) => state.profile);
  const getProfile = useProfileStore((state) => state.getProfile);

  console.log(profile);

  useEffect(() => {
    getProfile();
  }, []);

  return <div>Welcome, {profile?.username ?? "guest"}</div>;
};
