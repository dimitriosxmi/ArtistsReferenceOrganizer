import styled from "styled-components";
import Link from "next/link";
// SVGs
import { EntryFileIcon, PlusIcon } from "../svgs";

const NewEntryButton = ({ folderId }) => {
  return (
    <StyledLink
      href={folderId ? `/new-entry?folderId=${folderId}` : `/new-entry`}
    >
      <StyledEntryFileIcon />
      <StyledPlusIcon />
      <StyledParagraphText>(NEW ENTRY)</StyledParagraphText>
    </StyledLink>
  );
};

export default NewEntryButton;

const StyledEntryFileIcon = styled(EntryFileIcon)`
  position: relative;
  z-index: 1;
  width: 70px;
  height: 90px;
  color: #40cc90;
  left: 30px;
  bottom: 0px;
`;

const StyledPlusIcon = styled(PlusIcon)`
  position: relative;
  z-index: 2;
  width: 90px;
  height: 90px;
  bottom: 80px;
  right: 0px;
`;

const StyledLink = styled(Link)`
  display: block;
  z-index: 3;
  position: fixed;
  bottom: 1%;
  right: 5%;
  width: 100px;
  height: 100px;
  text-decoration: none;
  color: inherit;
`;

const StyledParagraphText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 900;
  position: relative;
  bottom: 225%;
`;
