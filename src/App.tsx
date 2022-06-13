import "./App.css";
import { Outlet } from "react-router";
// import { globalStore } from "./stores/global";
// import { userStore } from "./stores/user/user.store";
// import { User } from "./models/classes/core.classes";
import { useCoreService } from "./services/core.service";

function App() {
  const coreService = useCoreService();
  coreService.setupApplication();

  return <Outlet />;
}

export default App;
