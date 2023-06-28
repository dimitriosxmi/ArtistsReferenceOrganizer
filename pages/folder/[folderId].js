// Hooks
import { useRouter } from "next/router";

// Components
import CommonHeaderLayout from "../../components/CommonHeaderLayout";
import BackButton from "../../components/BackButton/BackButton.js";
import DeleteButton from "../../components/DeleteButton";
import NewEntryButton from "../../components/NewEntryButton";
import EntryPreviewList from "../../components/EntryPreviewList";

const FolderView = ({ sideBarOpen, setSideBarOpen }) => {
  const router = useRouter();
  const { folderId } = router.query;

  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <DeleteButton
        text={"Folder"}
        deleteAPIUrl={`/api/folder?folderId=${folderId}`}
      />
      <NewEntryButton folderId={folderId} />
      <EntryPreviewList folderId={folderId} />
    </>
  );
};

export default FolderView;
