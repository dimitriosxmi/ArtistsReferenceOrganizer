// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton";
import EntryPreviewList from "../components/EntryPreviewList";
import NewEntryButton from "../components/NewEntryButton";

const Content = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <EntryPreviewList />
      <NewEntryButton />
    </>
  );
};

export default Content;
