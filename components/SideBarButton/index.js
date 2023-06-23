import styled from "styled-components";
import { BurgerIcon, XIcon } from "../svgs";

const SidebarButton = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <StyledBurgerButton onClick={setSideBarOpen}>
        {
          // Changed Icon upon button click
          sideBarOpen ? (
            <XIcon width={"2rem"} height={"2rem"} />
          ) : (
            <BurgerIcon width={"2rem"} height={"2rem"} />
          )
        }
      </StyledBurgerButton>
    </>
  );
};

export default SidebarButton;

//#region Styled Objects
const StyledBurgerButton = styled.button`
  z-index: 3;
  position: absolute;
  left: 10px;
  top: 10px;
  width: 45px;
  height: 45px;
  border: 2px solid #444488;
  border-radius: 10px;
  color: #333;
  background-color: white;
`;
//#endregion
