import styled from "styled-components";
import { FolderIcon, PlusIcon } from "../svgs";
import Link from "next/link";

const NewFolderButton = () => {
  return (
    <StyledLink href="/new-folder">
      <StyledFolderIcon />
      <StyledPlusIcon />
      <StyledParagraphText>{"(NEW FOLDER)"}</StyledParagraphText>
    </StyledLink>
  );
};

export default NewFolderButton;

const StyledFolderIcon = styled(FolderIcon)`
  position: relative;
  z-index: 0;
  width: 100px;
  height: 100px;
  color: #40cc90;
  left: 20px;
  bottom: 5px;
`;
const StyledPlusIcon = styled(PlusIcon)`
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  bottom: 85px;
  right: 10px;
`;

const StyledLink = styled(Link)`
  display: block;
  z-index: 2;
  position: relative;
  left: 5%;
  width: 120px;
  height: 110px;
  text-decoration: none;
  color: inherit;
`;

const StyledParagraphText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 900;
  position: relative;
  bottom: 110px;
`;
