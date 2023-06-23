// Components
import Headline from "../Headline";
import Breadcrumb from "../Breadcrumb";
import SideBar from "../SideBar";
import SidebarButton from "../SideBarButton";

const CommonHeaderLayout = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <main>
      <Headline>ARO</Headline>
      <SidebarButton
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Breadcrumb />
    </main>
  );
};

export default CommonHeaderLayout;
