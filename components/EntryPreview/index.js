import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
// Hooks
import { useState } from "react";
// SVGs
import { ImageIcon, CaretRightIcon, CaretDownIcon } from "../svgs";
import { fill } from "@cloudinary/url-gen/actions/resize";

const EntryPreview = ({ entryData }) => {
  const { _id: entryId } = entryData;
  const [toggleExpander, setToggleExpander] = useState(false);

  return (
    <>
      <StyledEntryPreviewCard isexpanded={toggleExpander}>
        {!toggleExpander ? (
          // Short preview
          <>
            {/* Expander Toggle button */}
            <StyledExpanderToggleButton onClick={handleOnClickExpanderToggle}>
              {toggleExpander ? (
                <StyledCaretDownIcon
                  isexpanded={toggleExpander ? toggleExpander : null}
                />
              ) : (
                <StyledCaretRightIcon />
              )}
            </StyledExpanderToggleButton>
            {/* Clickable area to open entry */}
            <StyledPreviewCardLink
              href={`/${entryId}`}
              isexpanded={toggleExpander ? toggleExpander : null}
            >
              {/* Name */}
              <StyledEntryName>{entryData.entryName}</StyledEntryName>
              {/* Icon */}
              {entryData.entryUploadFile ? (
                <StyledImage
                  src={entryData.entryUploadFile}
                  alt="image"
                  width={150}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <StyledImageIcon />
              )}
              {/* Tags */}
              <StyledTagContainer>
                {entryData.entryTags.map((tag) => (
                  <StyledTagCard key={tag._id}>{tag.tagName}</StyledTagCard>
                ))}
              </StyledTagContainer>
            </StyledPreviewCardLink>
          </>
        ) : (
          // Expanded preview
          <>
            {/* Expander Toggle button */}
            <StyledExpanderToggleButton onClick={handleOnClickExpanderToggle}>
              {toggleExpander ? (
                <StyledCaretDownIcon />
              ) : (
                <StyledCaretRightIcon />
              )}
            </StyledExpanderToggleButton>
            {/* Name */}
            <StyledEntryName>{entryData.entryName}</StyledEntryName>
            {/* Clickable area to open entry */}
            <StyledPreviewCardLink
              href={`/${entryId}`}
              isexpanded={toggleExpander ? toggleExpander : null}
            >
              {/* Icon */}
              {entryData.entryUploadFile ? (
                <StyledImage
                  src={entryData.entryUploadFile}
                  alt="image"
                  width={200}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <StyledImageIcon />
              )}
              {/* Description */}
              <StyledEntryDescription>
                {entryData.entryDescription}
              </StyledEntryDescription>
              {/* Tags */}
              <StyledTagContainer>
                {entryData.entryTags.map((tag) => (
                  <StyledTagCard key={tag._id}>{tag.tagName}</StyledTagCard>
                ))}
              </StyledTagContainer>
            </StyledPreviewCardLink>
          </>
        )}
      </StyledEntryPreviewCard>
    </>
  );

  function handleOnClickExpanderToggle() {
    setToggleExpander(!toggleExpander);
  }
};

export default EntryPreview;

//#region Styled Objects
const StyledEntryPreviewCard = styled.div`
  position: relative;
  width: 90%;
  height: 75px;
  margin: 5px 0 5px 5%;
  padding: 0 0.5rem 0 5px;
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "caret cardLink"
    "caret cardLink";
  column-gap: 0.25rem;

  border: 2px solid #223;
  border-radius: 5px;
  color: inherit;

  ${({ isexpanded }) =>
    isexpanded
      ? `
    height: 225px;
    grid-template-columns: 1fr 3fr 4fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas:
    "caret title title"
    "cardLink cardLink cardLink";
  `
      : null}
`;

const StyledPreviewCardLink = styled(Link)`
  grid-area: cardLink;
  display: grid;
  grid-template-columns: 2fr 6fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "icon title"
    "icon tags";
  column-gap: 0.25rem;

  text-decoration: none;
  color: inherit;

  ${({ isexpanded }) =>
    isexpanded
      ? `
    grid-template-columns: 50% 50%;
    grid-template-rows: 75% 25%;
    grid-template-areas:
    "icon description"
    "tags tags";
  `
      : null}
`;

const StyledEntryName = styled.p`
  grid-area: title;
  margin: 0;
  padding: 3px;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledEntryDescription = styled.p`
  grid-area: description;
  max-height: 100px;
  padding: 3px;
  margin: 0;
  word-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledImageIcon = styled(ImageIcon)`
  grid-area: icon;
  height: 100%;
  max-height: 140px;
  width: 100%;
`;

const StyledImage = styled(Image)`
  grid-area: icon;
  height: 100%;
  max-height: 140px;
  width: 100%;
`;

const StyledTagCard = styled.div`
  margin: 0.125rem 0.125rem;
  padding: 0 0.25rem;
  border: 1px solid #223;
  border-radius: 10px;
  font-size: 1rem;
  white-space: nowrap;
`;

const StyledTagContainer = styled.div`
  grid-area: tags;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const StyledExpanderToggleButton = styled.button`
  grid-area: caret;
  height: 100%;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: none;
`;

const StyledCaretRightIcon = styled(CaretRightIcon)`
  position: relative;
  right: 5px;
  height: 100%;
  width: 100%;
`;

const StyledCaretDownIcon = styled(CaretDownIcon)`
  height: 50px;
  width: 50px;
`;
//#endregion
