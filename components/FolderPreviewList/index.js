import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
// Components
import FolderPreviewButton from "../FolderPreviewButton";
import NewFolderButton from "../NewFolderButton";

const FolderPreviewList = () => {
  const [dataFolders, setDataFolders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // GET all folders.
        const response = await fetch("/api/folders", {
          method: "GET",
        });

        if (response.ok) {
          const { data } = await response.json();
          setDataFolders(data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    })();
  }, []);

  if (dataFolders === []) return;

  return (
    <StyledFolderPreviewList>
      {dataFolders.map((folderData) => {
        return <FolderPreviewButton key={folderData._id} data={folderData} />;
      })}
      <NewFolderButton />
    </StyledFolderPreviewList>
  );
};

export default FolderPreviewList;

const StyledFolderPreviewList = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 90%;
  margin: 20px 0 20px 5%;
  column-gap: 5%;
`;
