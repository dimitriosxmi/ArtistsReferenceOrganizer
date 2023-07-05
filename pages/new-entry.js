// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton";
import Entryform from "../components/EntryForm";

const NewEntry = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <Entryform />
    </>
  );
};

export default NewEntry;
