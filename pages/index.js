// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import FolderPreviewList from "../components/FolderPreviewList";
import RecentUploads from "../components/RecentUploads";

export default function Home({ sideBarOpen, setSideBarOpen }) {
  return (
    <main>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <FolderPreviewList />
      <RecentUploads />
    </main>
  );
}
