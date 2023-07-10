import styled from "styled-components";
// Components
import CommonHeaderLayout from "../components/CommonHeaderLayout";
import BackButton from "../components/BackButton/BackButton";
import EntryPreviewList from "../components/EntryPreviewList";
import NewEntryButton from "../components/NewEntryButton";

const Content = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <CommonHeaderLayout
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <BackButton />
      <EntryPreviewList hasFiltering />
      <NewEntryButton />
      <Space />
    </>
  );
};

export default Content;

const Space = styled.div`
  // Add margin by px amount, if not provided the default is 150px.
  margin-bottom: ${({ px }) => (px ? `${px}px` : `150px`)};
`;
