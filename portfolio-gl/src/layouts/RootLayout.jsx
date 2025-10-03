import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="/" end>Start</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
