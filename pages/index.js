// Hooks
import { useState } from "react";

// Components
import Headline from "../components/Headline";
import Breadcrumb from "../components/Breadcrumb";
import RecentUploads from "../components/RecentUploads";
import SideBar from "../components/SideBar";
import SidebarButton from "../components/SideBarButton";

export default function Home() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <main>
      <Headline>ARO</Headline>
      <SidebarButton sideBarOpen={sideBarOpen} setSideBarOpen={handleOnClick} />
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={handleOnClick} />
      <Breadcrumb />
      <RecentUploads />
    </main>
  );

  function handleOnClick() {
    // Toggle sidebarOpen true/ false
    setSideBarOpen(!sideBarOpen);
  }
}
