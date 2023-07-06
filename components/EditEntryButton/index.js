import styled from "styled-components";
import Link from "next/link";
// SVGs
import { EntryFileIcon, PenIcon } from "../svgs";

const EditEntryButton = ({ toggleEditMode }) => {
  return (
    <StyledButton onClick={() => toggleEditMode()}>
      <StyledEntryFileIcon />
      <StyledPenIcon />
      <StyledParagraphText>(EDIT)</StyledParagraphText>
    </StyledButton>
  );
};

export default EditEntryButton;

//#region Styled Objects
const StyledEntryFileIcon = styled(EntryFileIcon)`
  position: relative;
  z-index: 1;
  width: 65px;
  height: 100px;
  color: #4090cc;
`;

const StyledPenIcon = styled(PenIcon)`
  position: relative;
  z-index: 2;
  width: 60px;
  height: 60px;
  bottom: 75px;
  left: 5px;
`;

const StyledButton = styled.button`
  z-index: 3;
  display: block;
  position: fixed;
  bottom: 1%;
  right: 5%;
  width: 70px;
  height: 100px;
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  border: transparent;
`;

const StyledParagraphText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 900;
  position: relative;
  bottom: 200%;
`;
//#endregion
