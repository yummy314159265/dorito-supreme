import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { FC, useEffect } from "react";
import { useAuthStore } from "./stores/AuthStore";

export const App: FC = (): JSX.Element => {
  const checkAuthentication = useAuthStore(
    (state) => state.checkAuthentication
  );

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
