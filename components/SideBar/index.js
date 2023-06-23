import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const router = useRouter();

  return sideBarOpen ? (
    <>
      <StyledSideBarBackground onClick={() => handleOnClickBackground()} />
      <StyledSideBar>
        <StyledLinks>
          <StyledLink href="/" onClick={() => setSideBarOpen()}>
            🏠 Dashboard
          </StyledLink>
        </StyledLinks>
      </StyledSideBar>
    </>
  ) : null;

  //#region Click handler function
  function handleOnClickBackground() {
    setSideBarOpen();
  }
  //#endregion
};

export default SideBar;

//#region Styled Objects
const StyledSideBar = styled.div`
  position: absolute;
  top: 0%;
  border: 2px solid #448;
  width: 80vw;
  height: 100vh;
  border-radius: 0 40px 40px 0;
  padding: 10vh 5vw 8vh 5vw;
  margin: 0vh 0 5vh 0vw;
  background-color: #ccddeee0;
`;

const StyledLink = styled(Link)`
  text-align: center;
  margin: 1vh 0 1vh 0;
  padding: 1vh 0 1vh 0;
  border: 2px solid;
  border-radius: 20px;
  font-size: 1.5rem;
  text-decoration: none;
  color: inherit;
`;

const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSideBarBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #4489;
`;
//#endregion
