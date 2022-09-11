import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";

function App() {
  // window.localStorage.setItem("arume-backend-uri", "http://localhost:4000");

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-900 text-slate-200">
      <NavBar />
      <RoutesContainer />
      {/* <Chat /> */}
    </div>
  );
}

export default App;
