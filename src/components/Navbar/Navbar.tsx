import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { LogoutButton } from "../LogoutButton/LogoutButton";

export const Navbar: FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <nav className="flex justify-between items-center h-12 pl-2 pr-2">
      <Link to="/">
        <span className="text-2xl">Gay Chat</span>
      </Link>
      <div className="text-xl">
        {!authenticated && (
          <>
            <Link to="/signup">Signup</Link>
            &nbsp;
            <Link to="/login">Login</Link>
          </>
        )}
        {authenticated && <LogoutButton />}
      </div>
    </nav>
  );
};
