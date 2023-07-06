// Hooks
import { useRouter } from "next/router";
import { useState } from "react";
// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton.js";
import DeleteButton from "../components/DeleteButton";
import EntryDetails from "../components/EntryDetails";

const EntryView = ({ sideBarOpen, setSideBarOpen }) => {
  const router = useRouter();
  const { entryId } = router.query;
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton editMode={editMode} toggleEditMode={handleOnClick} />
      <DeleteButton
        text={"Entry"}
        deleteAPIUrl={`/api/entry?entryId=${entryId}`}
      />
      <EntryDetails editMode={editMode} toggleEditMode={handleOnClick} />
    </>
  );

  function handleOnClick() {
    setEditMode(!editMode);
  }
};

export default EntryView;
