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
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pl-2 pr-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
