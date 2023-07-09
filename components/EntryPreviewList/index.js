import styled from "styled-components";
// Hooks
import { useState, useEffect, useRef } from "react";
// Components
import EntryPreview from "../EntryPreview";
import { setRequestMeta } from "next/dist/server/request-meta";

const EntryPreviewList = ({
  recentEntriesAmount,
  hasData,
  folderId,
  hasFiltering,
}) => {
  const [entries, setEntries] = useState([]);
  const [toggleFilterByDropdown, setToggleFilterByDropdown] = useState(false);
  const [filterBy, setFilterBy] = useState("none");
  const searchInput = useRef("");

  const dropdownOptions = [
    "none",
    "name",
    "tag_text",
    "folder_name",
    "description",
  ];

  //#region Get entries from database
  useEffect(() => {
    (async () => {
      try {
        //#region Get # most recent entries
        if (recentEntriesAmount) {
          const response = await fetch(
            `/api/entries?recentEntriesAmount=${recentEntriesAmount}`
          );

          if (response.ok) {
            const { data } = await response.json();
            setEntries(data);
            if (hasData) hasData(data);
          }
        }
        //#endregion
        //#region Get entries of specific folder
        else if (folderId) {
          const response = await fetch(
            `/api/entries?selectedFolderId=${folderId}`
          );

          if (response.ok) {
            const { data } = await response.json();
            setEntries(data);
          }
        }
        //#endregion
        //#region Get all entries
        else {
          const response = await fetch("/api/entries");

          if (response.ok) {
            const { data } = await response.json();
            setEntries(data);
            if (hasData) hasData(data);
          }
        }
        //#endregion
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    })();
  }, [folderId, hasData, recentEntriesAmount]);
  //#endregion

  if (!entries) return <p>Loading entries..</p>;

  return (
    <>
      {hasFiltering ? (
        <StyledFormContainer>
          {/* Search input */}
          <StyledInput
            type="text"
            id="searchInput"
            name="searchInput"
            ref={searchInput}
            placeholder="Enter here your search text."
          />
          {/* Filter by dropdown button */}
          <StyledButton
            id="filterBy"
            name="filterBy"
            type="button"
            value={`🔽${getFormattedDropdownOptionText(filterBy)}`}
            onClick={handleOnClickFilterByDropdown}
            filterby
          />
          {/* Search button */}
          <StyledButton
            search
            id="searchButton"
            name="searchButton"
            type="button"
            defaultValue="🔍 Search"
            onClick={handleOnClickSearch}
          />
          {/* Toggles on click of the filterby dropdown Button */}
          {toggleFilterByDropdown ? (
            <StyledDropdown>
              {
                // FilterBy dropdown options list
                dropdownOptions.map((dropdownOption) => (
                  <StyledDropdownListing
                    key={dropdownOption}
                    id={dropdownOption}
                    name={dropdownOption}
                    type="button"
                    onClick={() =>
                      handleOnClickFilterBySelection(dropdownOption)
                    }
                  >
                    {getFormattedDropdownOptionText(dropdownOption)}
                  </StyledDropdownListing>
                ))
              }
            </StyledDropdown>
          ) : null}
        </StyledFormContainer>
      ) : null}
      {/* Entry previews list */}
      {entries.map((entryData) => {
        return <EntryPreview key={entryData._id} entryData={entryData} />;
      })}
      ;
    </>
  );

  // Toggle 'Filter By' dropdown window
  function handleOnClickFilterByDropdown() {
    setToggleFilterByDropdown(!toggleFilterByDropdown);
  }

  // Save 'Filter By' dropdown selection
  function handleOnClickFilterBySelection(dropdownOption) {
    setFilterBy(dropdownOption);
    handleOnClickFilterByDropdown();
  }

  async function handleOnClickSearch() {
    try {
      // Get filtered data by:
      // the equivalent selected filter property field in database,
      // AND written value in the search input.
      if (filterBy != "none") {
        console.log(`${filterBy} : ${searchInput.current.value}`);

        const getResponse = await fetch(
          `/api/entries?filterBy=${filterBy}&searchText=${searchInput.current.value}`
        );
        if (getResponse.ok) {
          // Unpack data and apply to 'entries' state variable.
          const { data } = await getResponse.json();
          setEntries(data);
        }
      }
      // Get all data when none is selected for filtering option.
      else if (filterBy === "none") {
        const response = await fetch("/api/entries");

        if (response.ok) {
          // Unpack data and apply to 'entries' state variable.
          const { data } = await response.json();
          setEntries(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Formats the text display to capital first letter
  // and with white spaces instead of underscores.
  function getFormattedDropdownOptionText(stringValue) {
    return stringValue
      .replace(stringValue[0], stringValue[0].toUpperCase())
      .replace("_", " ");
  }
};

export default EntryPreviewList;

const StyledFormContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "input input"
    "filterBy search";
  column-gap: 5%;
  padding: 0 5% 0 5%;
  margin: 0;
`;

const StyledInput = styled.input`
  grid-area: input;
  margin: 10px 0 10px 0;
  border: 2px dashed #448;
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
  text-overflow: ellipsis;
  font-size: 1rem;
`;

const StyledButton = styled.input`
  grid-area: ${({ filterby, search }) =>
    filterby ? "filterBy" : search ? "search" : "none"};
  margin: 0 0 10px 0;
  padding: 0.5rem;
  border: 2px solid #448;
  border-radius: 10px;
  font-size: 1rem;
  background-color: ${({ filterby, search }) =>
    filterby ? "#4090cc" : search ? "#40cc90" : "white"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 100px;
  margin: 0 0 0 5%;
  padding: 5px;
  width: 90%;
  border: 2px solid #223;
  border-radius: 10px;
`;

const StyledDropdownListing = styled.button`
  margin: 0 0;
  padding: 0 0.5rem;
  width: 100%;
  height: 30px;
  font-size: 1rem;
  border: 1px solid #448;
  border-radius: 10px;
  background-color: #6af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    box-shadow: 0 0 10px 5px #4090cc;
    filter: brightness(120%);
  }

  &:active {
    filter: brightness(90%);
  }
`;
