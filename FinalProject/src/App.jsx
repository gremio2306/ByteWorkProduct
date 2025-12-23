import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const mode = "public"; // ganti jadi "admin" untuk lihat dashboard
  return mode === "public" ? <Home /> : <AdminDashboard />;
}
