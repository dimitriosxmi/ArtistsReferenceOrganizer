import styled from "styled-components";

const EntryPreview = ({ entryData }) => {
  return (
    <StyledEntryPreviewCard>
      <StyledEntryName>{entryData.entryName}</StyledEntryName>
    </StyledEntryPreviewCard>
  );
};

export default EntryPreview;

const StyledEntryPreviewCard = styled.div`
  width: 90%;
  height: 75px;
  margin: 5px 0 5px 5%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border: 2px solid #223;
  border-radius: 5px;
`;

const StyledEntryName = styled.p`
  margin: 0;
  padding: 3px;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
