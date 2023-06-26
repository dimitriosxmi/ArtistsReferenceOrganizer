// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton";
import NewEntryButton from "../components/NewEntryButton";

const Content = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <NewEntryButton />
    </>
  );
};

export default Content;
