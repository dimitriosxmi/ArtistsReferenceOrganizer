// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton.js";
import EntryDetails from "../components/EntryDetails";

const EntryView = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <EntryDetails />
    </>
  );
};

export default EntryView;
