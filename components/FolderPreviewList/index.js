import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";

import FolderPreviewIcon from "../FolderPreviewIcon";
import NewFolderButton from "../NewFolderButton";

const FolderPreviewList = () => {
  const [dataFolders, setDataFolders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/folders", {
          method: "GET",
        });

        if (response.ok) {
          const jsonData = await response.json();
          const cleanData = jsonData.data;
          setDataFolders(cleanData);
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
        return <FolderPreviewIcon key={folderData._id} data={folderData} />;
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
