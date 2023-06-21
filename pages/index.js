import Headline from "../components/Headline";
import Breadcrumb from "../components/Breadcrumb";
import RecentUploads from "../components/RecentUploads";

export default function Home() {
  return (
    <main>
      <Headline>ARO</Headline>
      <Breadcrumb />
      <RecentUploads />
    </main>
  );
}
