import { useContext } from "react";
import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";
import Context from "./Context/Context";
import Alert from "./Utils/Alert";

function App() {
  const UtilCtx = useContext(Context).util;

  window.localStorage.setItem(
    "arume-backend-uri",
    // "https://arume.herokuapp.com"
    "http://localhost:4000"
  );

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-900 text-slate-200">
      {UtilCtx.loader && <Loader />}
      {UtilCtx.alert.isVisible && <Alert />}
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
