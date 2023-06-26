// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton";
import NewEntryForm from "../components/NewEntryForm";

const NewEntry = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <NewEntryForm />
    </>
  );
};

export default NewEntry;
