import styled from "styled-components";
import Link from "next/link";
// SVGs
import { ImageIcon } from "../svgs";

const EntryPreview = ({ entryData }) => {
  const { _id: entryId } = entryData;

  return (
    <StyledEntryPreviewCard href={`/${entryId}`}>
      <StyledEntryName>{entryData.entryName}</StyledEntryName>
      <StyledImageIcon />
      <StyledTagContainer>
        {entryData.entryTags.map((tag) => (
          <StyledTagCard key={tag._id}>{tag.tagName}</StyledTagCard>
        ))}
      </StyledTagContainer>
    </StyledEntryPreviewCard>
  );
};

export default EntryPreview;

//#region Styled Objects
const StyledEntryPreviewCard = styled(Link)`
  width: 90%;
  height: 75px;
  margin: 5px 0 5px 5%;
  padding: 0 0.5rem 0 0;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "icon title"
    "icon tags";
  column-gap: 0.25rem;

  white-space: nowrap;
  border: 2px solid #223;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
`;

const StyledEntryName = styled.p`
  grid-area: title;
  margin: 0;
  padding: 3px;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImageIcon = styled(ImageIcon)`
  grid-area: icon;
  height: 100%;
  width: 100%;
`;

const StyledTagCard = styled.div`
  margin: 0.125rem 0.125rem;
  padding: 0 0.25rem;
  border: 1px solid #223;
  border-radius: 10px;
  font-size: 1rem;
`;

const StyledTagContainer = styled.div`
  grid-area: tags;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;
//#endregion
