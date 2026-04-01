import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Todo from "./pages/Todo";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
function AppWrapper() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/signup"]; // paths where Navbar should be hidden

  return (
    <div className="App">
      {/* Show Navbar only if current path is NOT login or signup */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
