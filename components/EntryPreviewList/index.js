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
  const [toggleSortByDropdown, setToggleSortByDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const searchInput = useRef("");

  const dropdownFilterByOptions = [
    "none",
    "name",
    "tag_text",
    "folder_name",
    "description",
  ];

  const dropdownSortByOptions = [
    "none",
    "name_A-Z",
    "name_Z-A",
    "name_size_>",
    "name_size_<",
    "tag_A-Z",
    "tag_Z-A",
    "tag_count_>",
    "tag_count_<",
    "description_A-Z",
    "description_Z-A",
    "description_size_>",
    "description_size_<",
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
            value={`🔽Filter: ${getFormattedDropdownOptionText(filterBy)}`}
            onClick={handleOnClickFilterByDropdown}
            $filterBy
          />
          {/* Search button */}
          <StyledButton
            $search
            id="searchButton"
            name="searchButton"
            type="button"
            defaultValue="🔍 Search"
            onClick={handleOnClickSearch}
          />
          {/* Sort by dropdown button */}
          <StyledButton
            id="sortBy"
            name="sortBy"
            type="button"
            value={`🔽Sort: ${getFormattedDropdownOptionText(sortBy)}`}
            onClick={handleOnClickSortByDropdown}
            $sortBy
          />
          {/* Toggles on click of the filterBy dropdown Button */}
          {toggleFilterByDropdown ? (
            <StyledDropdown>
              {
                // FilterBy dropdown options list
                dropdownFilterByOptions.map((dropdownOption) => (
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
          {/* Toggles on click of the sortBy dropdown Button */}
          {toggleSortByDropdown ? (
            <StyledDropdown>
              {
                // SortBy dropdown options list
                dropdownSortByOptions.map((dropdownOption) => (
                  <StyledDropdownListing
                    key={dropdownOption}
                    id={dropdownOption}
                    name={dropdownOption}
                    type="button"
                    onClick={() => handleOnClickSortBySelection(dropdownOption)}
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

  //#region FilterBy functions
  // Toggle 'Filter By' dropdown window
  function handleOnClickFilterByDropdown() {
    if (!toggleFilterByDropdown)
      toggleSortByDropdown ? setToggleSortByDropdown(false) : null;
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
  //#endregion

  //#region SortBy functions
  // Toggle 'Sort By' dropdown window
  function handleOnClickSortByDropdown() {
    if (!toggleSortByDropdown)
      toggleFilterByDropdown ? setToggleFilterByDropdown(false) : null;
    setToggleSortByDropdown(!toggleSortByDropdown);
  }

  // Save 'Sort By' dropdown selection
  function handleOnClickSortBySelection(dropdownOption) {
    setSortBy(dropdownOption);

    if (dropdownOption !== "none") {
      // Lets check all value cases of the selected dropdownOption.
      switch (dropdownOption) {
        // Filter entries by alphabetical name order.
        case "name_A-Z":
          const sortedByNameAlphabetical = entries.slice().sort((a, b) => {
            const nameA = a.entryName.toUpperCase();
            const nameB = b.entryName.toUpperCase();
            if (nameA < nameB) {
              return -1;
            } else if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

          setEntries(sortedByNameAlphabetical);
          break;
        // Filter entries by unalphabetical name order.
        case "name_Z-A":
          const sortedByNameUnalphabetical = entries.slice().sort((a, b) => {
            const nameA = a.entryName.toUpperCase();
            const nameB = b.entryName.toUpperCase();
            if (nameA > nameB) {
              return -1;
            } else if (nameA < nameB) {
              return 1;
            }
            return 0;
          });

          setEntries(sortedByNameUnalphabetical);
          break;
        // Filter entries by larger to smaller name.
        case "name_size_>":
          const sortedByNameLengthLarger = entries.slice().sort((a, b) => {
            const nameLengthA = a.entryName.length;
            const nameLengthB = b.entryName.length;
            return nameLengthB - nameLengthA;
          });

          setEntries(sortedByNameLengthLarger);
          break;
        // Filter entries by smaller to larger name.
        case "name_size_<":
          const sortedByNameLengthSmaller = entries.slice().sort((a, b) => {
            const nameLengthA = a.entryName.length;
            const nameLengthB = b.entryName.length;
            return nameLengthA - nameLengthB;
          });

          setEntries(sortedByNameLengthSmaller);
          break;
        // Filter entries by alphabetical tag order.
        case "tag_A-Z":
          const entriesWithTags = entries.slice().filter((entry) => {
            return entry.entryTags.length > 0;
          });
          const entriesWithoutTags = entries.slice().filter((entry) => {
            return entry.entryTags.length < 1;
          });

          const sortedByTagAlphabetical = entriesWithTags
            .slice()
            .sort((a, b) => {
              const tagsA = a.entryTags.slice().sort((_a, _b) => {
                const tagNameA = _a.tagName.toUpperCase();
                const tagNameB = _b.tagName.toUpperCase();
                return tagNameA < tagNameB ? -1 : tagNameA > tagNameB ? 1 : 0;
              });
              const tagsB = b.entryTags.slice().sort((_a, _b) => {
                const tagNameA = _a.tagName.toUpperCase();
                const tagNameB = _b.tagName.toUpperCase();
                return tagNameA < tagNameB ? -1 : tagNameA > tagNameB ? 1 : 0;
              });

              if (tagsA[0]?.tagName < tagsB[0]?.tagName) {
                return -1;
              } else if (tagsA[0]?.tagName > tagsB[0]?.tagName) {
                return 1;
              }
              return 0;
            })
            .concat(entriesWithoutTags);

          setEntries(sortedByTagAlphabetical);
          break;
        // Filter entries by unalphabetical tag order.
        case "tag_Z-A":
          const _entriesWithTags = entries.slice().filter((entry) => {
            return entry.entryTags.length > 0;
          });
          const _entriesWithoutTags = entries.slice().filter((entry) => {
            return entry.entryTags.length < 1;
          });

          const sortedByTagUnalphabetical = _entriesWithTags
            .slice()
            .sort((a, b) => {
              const tagsA = a.entryTags.slice().sort((_a, _b) => {
                const tagNameA = _a.tagName.toUpperCase();
                const tagNameB = _b.tagName.toUpperCase();
                return tagNameA < tagNameB ? -1 : tagNameA > tagNameB ? 1 : 0;
              });
              const tagsB = b.entryTags.slice().sort((_a, _b) => {
                const tagNameA = _a.tagName.toUpperCase();
                const tagNameB = _b.tagName.toUpperCase();
                return tagNameA < tagNameB ? -1 : tagNameA > tagNameB ? 1 : 0;
              });

              if (tagsA[0].tagName > tagsB[0].tagName) {
                return -1;
              } else if (tagsA[0].tagName < tagsB[0].tagName) {
                return 1;
              }
              return 0;
            })
            .concat(_entriesWithoutTags);

          setEntries(sortedByTagUnalphabetical);
          break;
        // Filter entries by most to least tags.
        case "tag_count_>":
          const sortedByTagCountLarger = entries.slice().sort((a, b) => {
            const tagCountA = a.entryTags.length;
            const tagCountB = b.entryTags.length;
            return tagCountB - tagCountA;
          });

          setEntries(sortedByTagCountLarger);
          break;
        // Filter entries by least to most tags.
        case "tag_count_<":
          const sortedByTagCountSmaller = entries.slice().sort((a, b) => {
            const tagCountA = a.entryTags.length;
            const tagCountB = b.entryTags.length;
            return tagCountA - tagCountB;
          });

          setEntries(sortedByTagCountSmaller);
          break;
        // Filter entries by alphabetical description order.
        case "description_A-Z":
          const sortedByDescriptionAlphabetical = entries
            .slice()
            .sort((a, b) => {
              const descriptionA = a.entryDescription.toUpperCase();
              const descriptionB = b.entryDescription.toUpperCase();
              if (descriptionA < descriptionB) {
                return -1;
              } else if (descriptionA > descriptionB) {
                return 1;
              }
              return 0;
            });

          setEntries(sortedByDescriptionAlphabetical);
          break;
        // Filter entries by unalphabetical description order.
        case "description_Z-A":
          const sortedByDescriptionUnalphabetical = entries
            .slice()
            .sort((a, b) => {
              const descriptionA = a.entryDescription.toUpperCase();
              const descriptionB = b.entryDescription.toUpperCase();
              if (descriptionA > descriptionB) {
                return -1;
              } else if (descriptionA < descriptionB) {
                return 1;
              }
              return 0;
            });

          setEntries(sortedByDescriptionUnalphabetical);
          break;
        // Filter entries by larger to smaller description.
        case "description_size_>":
          const sortedByDescriptionLengthLarger = entries
            .slice()
            .sort((a, b) => {
              const descriptionLengthA = a.entryDescription.length;
              const descriptionLengthB = b.entryDescription.length;
              return descriptionLengthB - descriptionLengthA;
            });

          setEntries(sortedByDescriptionLengthLarger);
          break;
        // Filter entries by smaller to larger description.
        case "description_size_<":
          const sortedByDescriptionLengthSmaller = entries
            .slice()
            .sort((a, b) => {
              const descriptionLengthA = a.entryDescription.length;
              const descriptionLengthB = b.entryDescription.length;
              return descriptionLengthA - descriptionLengthB;
            });

          setEntries(sortedByDescriptionLengthSmaller);
          break;
      }
    }

    handleOnClickSortByDropdown();
  }
  //#endregion

  // Formats the text display to capital first letter
  // and with white spaces instead of underscores.
  function getFormattedDropdownOptionText(stringValue) {
    return stringValue
      .replace(stringValue[0], stringValue[0].toUpperCase())
      .replaceAll("_", " ");
  }
};

export default EntryPreviewList;

//#region Styled Objects
const StyledFormContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "input input"
    "filterBy search"
    "sortBy sortBy";
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
  grid-area: ${({ $filterBy, $search, $sortBy }) =>
    $filterBy ? "filterBy" : $search ? "search" : $sortBy ? "sortBy" : "none"};
  margin: 0 0 10px 0;
  padding: 0.5rem;
  border: 2px solid #448;
  border-radius: 10px;
  font-size: 1rem;
  background-color: ${({ $filterBy, $search, $sortBy }) =>
    $filterBy || $sortBy ? "#4090cc" : $search ? "#40cc90" : "white"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 150px;
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
//#endregion
