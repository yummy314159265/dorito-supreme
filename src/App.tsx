import { useEffect } from "react";
import "./App.css";
import { supabaseClient } from "./api/supabaseClient";

function App(): JSX.Element {
  const test = async (): Promise<void> => {
    const channels = await supabaseClient.from("messages").select();
    console.log(channels);
  };

  useEffect(() => {
    test();
  }, []);

  return <div className="text-2xl">Hello world</div>;
}

export default App;
