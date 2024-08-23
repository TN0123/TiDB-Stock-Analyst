import ChatWindow from "./components/ChatWindow";
import "./App.css";
// import ScrapeButton from "./components/ScrapeButton";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ChatWindow />
      <About />
      {/* <ScrapeButton /> */}
    </div>
  );
}

export default App;
