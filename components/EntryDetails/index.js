import styled from "styled-components";
// Hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Components
import EditEntryButton from "../EditEntryButton";
import EntryForm from "../EntryForm";

const EntryDetails = ({ editMode, toggleEditMode }) => {
  const router = useRouter();
  const { entryId } = router.query;
  const [entryData, setEntryData] = useState();

  // GET entry by id from database.
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/entry?entryId=${entryId}`);

      if (response.ok) {
        // Unpack received data and pass it to entryData state variable.
        const { data } = await response.json();
        setEntryData(data);
      }
    })();
  }, [entryId, editMode]);

  if (!entryData) return <p>Loading..</p>;

  const { entryName, entryReferenceLink, entryTags, entryDescription } =
    entryData;

  return (
    <>
      {/* When editmode is toggled,
          the entry details hide,
          and the entry form shows */}
      {!editMode ? (
        <>
          {/* Name  */}
          <StyledHeadline>{entryName}</StyledHeadline>
          {/* Link */}
          <StyledText bold>Link:</StyledText>
          <StyledText borderBottom>{entryReferenceLink}</StyledText>
          {/* Tags */}
          <StyledTagContainer>
            <StyledText noMargin bold>
              Tags:
            </StyledText>
            {entryTags.map((tag) => (
              <StyledTagCard key={tag._id}>{tag.tagName}</StyledTagCard>
            ))}
          </StyledTagContainer>
          {/* Description */}
          <StyledText borderTop bold>
            Description:
          </StyledText>
          <StyledText>{entryDescription}</StyledText>
          <EditEntryButton toggleEditMode={toggleEditMode} />
        </>
      ) : (
        <EntryForm editEntryData={entryData} toggleEditMode={toggleEditMode} />
      )}
    </>
  );
};

export default EntryDetails;

//#region Styled Objects
const StyledHeadline = styled.p`
  max-width: 90%;
  margin: 10px 0 0 5%;
  padding: 0.5rem;
  font-size: 2rem;
  text-align: center;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledText = styled.p`
  max-width: 90%;
  margin: 0 0 0 5%;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: start;
  overflow: hidden;

  ${({ bold }) => (bold ? `font-weight: 600;` : null)}
  ${({ borderTop }) => (borderTop ? `border-top: 2px dashed #223;` : null)}
  ${({ borderBottom }) =>
    borderBottom ? `border-bottom: 2px dashed #223;` : null}
  ${({ noMargin }) => (noMargin ? `margin: 0;` : null)}
`;

const StyledTagCard = styled.div`
  margin: 0.125rem 0.25rem;
  padding: 0 0.25rem;
  border: 1px solid #223;
  border-radius: 10px;
  font-size: 1rem;
`;

const StyledTagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  padding-left: 5%;
`;
//#endregion
