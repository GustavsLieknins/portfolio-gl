import { Outlet } from "react-router-dom";
import GlobalBackground from "../components/GlobalBackground";

export default function RootLayout() {
  return (
    <>
      <GlobalBackground />
      <Outlet />
    </>
  );
}
