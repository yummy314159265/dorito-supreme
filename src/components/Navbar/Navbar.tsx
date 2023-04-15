import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { LogoutButton } from "../LogoutButton/LogoutButton";

export const Navbar: FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <nav className="flex justify-between">
      <Link to="/">Home</Link>
      {!authenticated && (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {authenticated && <LogoutButton />}
    </nav>
  );
};
