import styled from "styled-components";
import Link from "next/link";
// SVGs
import { FolderIcon } from "../svgs";

const FolderPreviewButton = ({ data }) => {
  return (
    <StyledFolderLink href={`/folder/${data._id}`}>
      <StyledFolderIcon foldercolor={data.folderColor} />
      <StyledParagraphText>{data.folderName}</StyledParagraphText>
    </StyledFolderLink>
  );
};

export default FolderPreviewButton;

//#region Styled Objects
const StyledFolderIcon = styled(FolderIcon)`
  z-index: 0;
  width: 100%;
  height: 60%;
  color: ${({ foldercolor }) => foldercolor};
`;

const StyledFolderLink = styled(Link)`
  display: inline-block;
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
//#endregion
