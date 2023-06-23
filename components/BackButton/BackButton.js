import styled from "styled-components";
import { ArrowLeftLong } from "../svgs";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <StyledLink onClick={() => router.back()}>
      <StyledArrowLeftLong width={"2rem"} height={"2rem"} />
    </StyledLink>
  );
};

export default BackButton;

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
  /* padding: 10px; */
  border: 2px solid #444488;
  border-radius: 10px;
  width: 45px;
  height: 45px;
`;
