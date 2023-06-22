import styled from "styled-components";
import Image from "next/image";
// import burgerIcon from "../svgs/burgerIcon";
// import BurgerIcon from "../svgs";
import { BurgerIcon, XIcon } from "../svgs";
import { useState } from "react";

const SidebarButton = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <StyledBurgerButton onClick={setSideBarOpen}>
        {
          // Change Switch Icon when clicked
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

const StyledBurgerButton = styled.button`
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 10px;
  border: 2px solid #444488;
  border-radius: 10px;
  color: #333;
  background-color: white;
`;

export default SidebarButton;
