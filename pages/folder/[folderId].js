// Hooks
import { useRouter } from "next/router";

// Components
import CommonHeaderLayout from "../../components/CommonHeaderLayout";
import BackButton from "../../components/BackButton/BackButton.js";
import NewEntryButton from "../../components/NewEntryButton";
import EntryPreviewList from "../../components/EntryPreviewList";

const FolderView = ({ sideBarOpen, setSideBarOpen }) => {
  const router = useRouter();
  const routerParams = router.query;
  const folderId = routerParams.folderId;

  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <NewEntryButton folderId={folderId} />
      <EntryPreviewList folderId={folderId} />
    </>
  );
};

export default FolderView;
