import styled from "styled-components";
// SVGs
import { FolderIcon } from "../svgs";

const FolderPreviewIcon = ({ data }) => {
  return (
    <StyledFolder>
      <StyledFolderIcon foldercolor={data.folderColor} />
      <StyledParagraphText>{data.folderName}</StyledParagraphText>
    </StyledFolder>
  );
};

export default FolderPreviewIcon;

const StyledFolderIcon = styled(FolderIcon)`
  z-index: 0;
  width: 100%;
  height: 60%;
  color: ${({ foldercolor }) => foldercolor};
`;

const StyledFolder = styled.div`
  z-index: 1;
  width: 30%;
  text-decoration: none;
  color: inherit;
`;

const StyledParagraphText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 75%;
  font-weight: 600;
  position: relative;
  bottom: 5%;
`;
