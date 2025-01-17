import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "./FullChatInterface";
import User from "./User";
import Settings from "./Settings";
import AuthSignInSignOut from "./AuthSignInSignOut";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AuthSignInSignOut />} />
          <Route path="/home" element={<ChatInterface />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
