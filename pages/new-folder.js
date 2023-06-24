import BackButton from "../components/BackButton/BackButton";
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import NewFolderForm from "../components/NewFolderForm";

const NewFolder = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <NewFolderForm />
    </>
  );
};

export default NewFolder;
