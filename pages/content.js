import BackButton from "../components/BackButton/BackButton";
import CommonHeaderLayout from "../components/CommonHeaderLayout";

const Content = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
    </>
  );
};

export default Content;
