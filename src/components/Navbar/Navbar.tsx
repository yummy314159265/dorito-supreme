import { FC } from "react";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};
