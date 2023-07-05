import styled from "styled-components";
// Hooks
import { useRouter } from "next/router";
// SVGs
import { ArrowLeftLong } from "../svgs";

const BackButton = () => {
  const router = useRouter();
  return (
    <StyledLink onClick={() => router.push(`/`)}>
      <StyledArrowLeftLong width={"2rem"} height={"2rem"} />
    </StyledLink>
  );
};

export default BackButton;

//#region Styled Objects
const StyledArrowLeftLong = styled(ArrowLeftLong)`
  z-index: -1;
  color: #333;
`;

const StyledLink = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 10px;
  top: -5px;
  border: 2px solid #448;
  border-radius: 10px;
  width: 45px;
  height: 45px;
`;
//#endregion
