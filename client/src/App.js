import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";

function App() {
  window.localStorage.setItem("arume-backend-uri", "http://localhost:4000");

  return (
    <div className="h-screen bg-slate-900 text-slate-200 w-screen flex items-center flex-col">
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
