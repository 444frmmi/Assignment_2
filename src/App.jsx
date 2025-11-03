import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ConfigPage from "./pages/ConfigPage";
import LogFormPage from "./pages/LogFormPage";
import LogsPage from "./pages/LogsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white text-gray-100">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">
          <div className="bg-pink-200 text-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
            <Routes>
              <Route path="/" element={<ConfigPage />} />
              <Route path="/add-log" element={<LogFormPage />} />
              <Route path="/logs" element={<LogsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
