import styled from "styled-components";

const Headline = ({ children }) => {
  // Return children as StyledHeadline
  return <StyledHeadline>{children ? children : null}</StyledHeadline>;
};

export default Headline;

const StyledHeadline = styled.h1`
  text-align: center;
  margin: 5px;
  margin-bottom: -5px;
`;
