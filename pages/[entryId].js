// Hooks
import { useRouter } from "next/router";
// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton.js";
import DeleteButton from "../components/DeleteButton";
import EntryDetails from "../components/EntryDetails";

const EntryView = ({ sideBarOpen, setSideBarOpen }) => {
  const router = useRouter();
  const { entryId } = router.query;

  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <DeleteButton
        text={"Entry"}
        deleteAPIUrl={`/api/entry?entryId=${entryId}`}
      />
      <EntryDetails />
    </>
  );
};

export default EntryView;
