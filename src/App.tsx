import "./App.css";
import { Outlet } from "react-router";
import { useCoreService } from "./services/core.service";
import { useEffect, useState } from "react";

function App() {
  const coreService = useCoreService();
  coreService.setupApplication();

  useEffect(() => {
    let subscription = coreService.selectTheme().subscribe((isLightTheme: boolean) => {
      if (isLightTheme) {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <div><Outlet /></div>;
}

export default App;
