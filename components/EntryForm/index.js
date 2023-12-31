import styled from "styled-components";
// Hooks
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
// SVGs
import { PlusIcon, PenIcon } from "../svgs";
// Component
import Image from "next/image";

const EntryForm = ({ editEntryData, toggleEditMode }) => {
  const router = useRouter();
  const { folderId } = router.query;

  const [selectedTags, setSelectedTags] = useState(
    editEntryData?.entryTags ? editEntryData.entryTags : []
  );
  const [tags, setTags] = useState([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [folders, setFolders] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState({
    folderName: "-- Select A Folder --",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSource, setSelectedFileSource] = useState(
    editEntryData?.entryUploadFile ? editEntryData.entryUploadFile : null
  );
  const [selectedFileName, setSelectedFileName] = useState(
    editEntryData?.entryUploadFile ? editEntryData.entryUploadFile : ""
  );
  const tagInputElement = useRef();
  const imageFileInputElement = useRef();

  // GET's the tags and folders list from database.
  useEffect(() => {
    (async () => {
      await updateTagsList();
      await updateFoldersList();
    })();
  }, []);

  if (!tags) return <p>Loading..</p>;

  return (
    <form onSubmit={handleOnSubmit}>
      {/* Entry name input. */}
      <StyledInput
        type="text"
        name="entryName"
        placeholder="Enter here your entry name."
        required
        autoFocus
        defaultValue={editEntryData ? editEntryData.entryName : ""}
      />
      <StyledFileSelectLabel
        $selectedImage={selectedFileName !== "" ? true : null}
      >
        {selectedFileName === "" ? "Tap me to select an Image" : null}
        {selectedFileSource ? (
          <Image
            src={
              editEntryData && !selectedFileSource
                ? editEntryData.entryUploadFile
                : selectedFileSource
            }
            alt={"uploaded image"}
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
          />
        ) : null}
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleOnImageSelect}
          ref={imageFileInputElement}
        />
      </StyledFileSelectLabel>
      {selectedFileName !== "" ? (
        <StyledFileRemoveButtonContainer>
          <StyledFileRemoveButton
            type="button"
            value="❌ Remove Image"
            onClick={handleOnClickRemoveImage}
          />
        </StyledFileRemoveButtonContainer>
      ) : null}
      {/* Entry reference link input. */}
      <StyledLabel htmlFor="entryReferenceLink">Refrence a Link:</StyledLabel>
      <StyledTextArea
        type="url"
        id="entryReferenceLink"
        name="entryReferenceLink"
        rows={3}
        defaultValue={editEntryData ? editEntryData.entryReferenceLink : ""}
      />
      {/* Entry Folder Selection */}
      <StyledSection>
        <StyledSectionHeader>Folder Selection</StyledSectionHeader>
        <StyledDropdownButton
          id="entrySelectedFolder"
          name="entrySelectedFolder"
          type="button"
          defaultValue={`${dropdownSelection.folderName}`}
          onClick={handleOnClickDropdown}
        />
        {/* Toggles on click of the dropdown Button */}
        {toggleDropdown ? (
          <StyledDropdown>
            {/* Default no folder selection button */}
            <StyledDropdownListing
              type="button"
              onClick={() =>
                handleOnClickFolderSelect({
                  folderName: "-- Select A Folder --",
                })
              }
              style={{ filter: "brightness(75%)" }}
            >
              -- NO FOLDER --
            </StyledDropdownListing>
            {/* List of all folders as buttons */}
            {folders.map((folder) => (
              <StyledDropdownListing
                key={folder._id}
                type="button"
                onClick={() => handleOnClickFolderSelect(folder)}
              >
                {folder.folderName}
              </StyledDropdownListing>
            ))}
          </StyledDropdown>
        ) : null}
      </StyledSection>
      {/* Entry description input. */}
      <StyledSection>
        <StyledSectionHeader>Description</StyledSectionHeader>
        <StyledTextArea
          id="entryDescription"
          name="entryDescription"
          rows={3}
          defaultValue={editEntryData ? editEntryData.entryDescription : ""}
        />
      </StyledSection>
      {/* Entry tags. */}
      <StyledSection>
        <StyledSectionHeader>Tags</StyledSectionHeader>
        {/* Display available tags list. */}
        <StyledTagSelection>
          <StyledText>Use Tag:</StyledText>
          {tags.map((tag) => (
            <StyledTagCard
              key={tag._id}
              isSelected={selectedTags.find((_tag) => _tag._id === tag._id)}
            >
              <StyledDeleteCardButton
                type="button"
                value={"X"}
                onClick={() => handleOnClickDeleteTag(tag)}
              />
              <StyledTagCardButton
                type="button"
                value={tag.tagName}
                onClick={() => handleOnClickTag(tag)}
                isSelected={selectedTags.find((_tag) => _tag._id === tag._id)}
              />
            </StyledTagCard>
          ))}
        </StyledTagSelection>
        {/* Create new tags. */}
        <StyledTagsArea>
          <StyledText>New Tag:</StyledText>
          <StyledTagInput
            type="text"
            id="newTagInput"
            ref={tagInputElement}
            maxLength={15}
            placeholder="Max 15 characters per tag."
          />
          <StyledTagCreateButton
            type="button"
            value="➕ Add Tag"
            onClick={() => handleOnClickCreateTag()}
          />
        </StyledTagsArea>
      </StyledSection>
      <ExtraSpace />
      <StyledSubmitButton editMode={editEntryData ? true : false}>
        {editEntryData ? <StyledPenIcon /> : <StyledPlusIcon />}
      </StyledSubmitButton>
    </form>
  );

  // GET all tags and apply them to the 'tags' state variable.
  async function updateTagsList() {
    // GET all tags from database.
    const response = await fetch(`/api/tags`);

    if (response.ok) {
      // Unpack data and apply to 'tags' state variable.
      const { data } = await response.json();
      setTags(data);
    }
  }

  // GET all folders and apply them to the 'folders' state variable.
  async function updateFoldersList() {
    // GET all folders from database.
    const response = await fetch("/api/folders");

    if (response.ok) {
      // Unpack data and apply to 'folders' state variable.
      const { data } = await response.json();
      setFolders(data);

      // When edit mode is toggled ON
      // and the entry data has a selected folder
      // pass it into the form.
      if (editEntryData?.entrySelectedFolder) {
        const selectedFolder = data.find(
          (folder) => folder._id === editEntryData.entrySelectedFolder
        );
        if (selectedFolder) {
          setDropdownSelection(selectedFolder);
        }
      }
    }
  }

  // Store the selected file name and file path.
  function handleOnImageSelect(event) {
    // Take input value and clean up the path
    // down to only the file name and type.
    const fileName = event.target.value.replace(/.*[\/\\]/, "");
    setSelectedFileName(fileName);

    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setSelectedFileSource(onLoadEvent.target.result);
      setSelectedFile(undefined);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  // Remove selected file.
  function handleOnClickRemoveImage() {
    setSelectedFile(null);
    setSelectedFileName("");
    setSelectedFileSource(null);
  }

  // Toggle Dropdown window
  function handleOnClickDropdown() {
    setToggleDropdown(!toggleDropdown);
  }

  // Save dropdown selection
  function handleOnClickFolderSelect(folder) {
    setDropdownSelection(folder);
    handleOnClickDropdown();
  }

  // DELETE tag from database and Toggle OFF selection.
  async function handleOnClickDeleteTag(tag) {
    // DELETE tag from database.
    const response = await fetch(`/api/tag?tagId=${tag._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // GET update all tags list.
      await updateTagsList();
      // If Toggled ON Tag.
      if (selectedTags.includes(tag)) {
        // Toggle OFF Tag (Remove).
        const selectedTagsCopy = [...selectedTags];
        const index = selectedTagsCopy.indexOf(tag);
        selectedTagsCopy.splice(index, 1);

        setSelectedTags([...selectedTagsCopy]);
      }
    }
  }

  // Toggle tag between selected/ unselected.
  function handleOnClickTag(tag) {
    // Toggle ON Tag (Add).
    if (!selectedTags.find((_selectedTag) => _selectedTag._id === tag._id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    // Toggle OFF Tag (Remove).
    else if (
      selectedTags.find((_selectedTag) => _selectedTag._id === tag._id)
    ) {
      const selectedTagsCopy = [...selectedTags];
      const equivalentTag = selectedTagsCopy.find(
        (_tag) => _tag._id === tag._id
      );
      const index = selectedTagsCopy.indexOf(equivalentTag);
      selectedTagsCopy.splice(index, 1);

      setSelectedTags([...selectedTagsCopy]);
    }
  }

  // POST's new tag into database.
  async function handleOnClickCreateTag() {
    const inputValue = tagInputElement.current.value;

    if (inputValue.length > 0) {
      // POST inputValue as tag to database.
      const postResponse = await fetch(`/api/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagName: inputValue }),
      });

      if (postResponse.ok) {
        // GET update all tags list.
        await updateTagsList();
        tagInputElement.current.value = "";
        tagInputElement.current.focus();
      }
    }
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // IF edit mode, use the existing entryUploadData.
    // Else use the current new Date as timestamp.
    !editEntryData
      ? (data.entryUploadDate = new Date().valueOf())
      : (data.entryUploadDate = editEntryData.entryUploadDate);

    // When you selected folder in dropdown
    // Apply the selection to the entry
    dropdownSelection &&
    !dropdownSelection.folderName.includes("-- Select A Folder --")
      ? (data.entrySelectedFolder = dropdownSelection._id)
      : null;

    // Apply to entry the selectedTags.
    data.entryTags = selectedTags;

    // IF selected folder is not provided AND folderId is provided
    // apply to entry selected folder the folderId.
    !data.entrySelectedFolder && folderId
      ? (data.entrySelectedFolder = folderId)
      : null;

    if (selectedFileName !== "") {
      // Prepare the image data for POST.
      const _form = event.currentTarget;
      const _fileInput = Array.from(_form.elements).find(
        ({ name }) => name === "file"
      );
      const _formData = new FormData();

      for (const file of _fileInput.files) {
        _formData.append("file", file);
      }

      _formData.append("upload_preset", "my-uploads");

      // POST the image to cloudinary.
      const _data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: _formData,
        }
      ).then((response) => response.json());

      // Collect Data.
      setSelectedFileSource(_data.secure_url);
      setSelectedFile(_data);

      // Pass image url to entry.
      data.entryUploadFile = _data.secure_url;
    } else {
      data.entryUploadFile = null;
    }

    if (editEntryData) {
      // PATCH the edited entry.
      const response = await fetch(`/api/entry?entryId=${editEntryData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (toggleEditMode) {
          toggleEditMode();
        }
      }
    } else {
      // POST the entry.
      const response = await fetch("/api/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // If folderId was provided, route back to corresponding folder.
        if (folderId) {
          router.push(`/folder/${folderId}`);
          return;
        }
        router.push("/");
      }
    }
  }
};

export default EntryForm;

//#region Styled Objects
const StyledInput = styled.input`
  margin: 20px 0 20px 5%;
  border: 2px dashed #448;
  width: 90%;
  height: 2rem;
  padding: 0.5rem;
  text-overflow: ellipsis;
  font-size: 1rem;
`;

const StyledFileSelectLabel = styled.label`
  width: 90%;
  height: 300px;
  margin: 0 0 10px 5%;
  padding: 10%;
  display: flex;
  align-items: center;
  border: 2px dashed #448;
  background-color: white;
  overflow: hidden;
  word-break: break-word;

  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(70%);
  }

  ${({ $selectedImage }) =>
    $selectedImage
      ? `
    padding: 0;
  `
      : null}
`;

const StyledFileRemoveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 5% 0 0;
`;

const StyledFileRemoveButton = styled.input`
  border-radius: 10px;
  background: #faa;
  border: 2px solid #223;
  font-size: 1rem;
`;

const StyledLabel = styled.label`
  margin: 0 0 0 5%;
  font-size: 1rem;
  font-weight: 600;
`;

const StyledTextArea = styled.textarea`
  margin: 0 0 0 5%;
  padding: 0.5rem;
  border: 2px dashed #448;
  width: 90%;
  font-size: 1rem;
`;

const StyledSection = styled.section`
  margin: 20px 0 0 5%;
  padding: 0 0 20px 0;
  border: 2px solid #223;
  width: 90%;
`;

const StyledDropdownButton = styled.input`
  margin: 0 0 0 5%;
  padding: 0.5rem;
  border: 2px solid #448;
  border-radius: 10px;
  width: 90%;
  font-size: 1rem;
  background-color: #40cc90;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDropdown = styled.div`
  margin: 0 0 0 5%;
  padding: 5px;
  width: 90%;
  border: 2px solid #223;
  border-radius: 10px;
`;

const StyledDropdownListing = styled.button`
  padding: 0 0.5rem;
  width: 100%;
  height: 30px;
  font-size: 1rem;
  border: 1px solid #448;
  border-radius: 10px;
  background-color: #6fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    box-shadow: 0 0 10px 5px #40cc90;
    filter: brightness(120%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

const ExtraSpace = styled.section`
  margin-bottom: 100px;
  width: 90%;
`;

const StyledSectionHeader = styled.p`
  margin: 0 0 10px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

const StyledTagSelection = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 90%;
  padding-left: 5%;
`;

const StyledTagCard = styled.div`
  margin: 0.125rem 0.25rem;
  padding: 0;
  border: 2px dashed #448;
  border-radius: 10px;

  ${({ isSelected }) => {
    return isSelected
      ? `
      background-color: #4090cc;
      border: 2px dashed #40cc90;
    `
      : null;
  }}
`;

const StyledTagCardButton = styled.input`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;

  ${({ isSelected }) => {
    return isSelected
      ? `
      color: #eef;
    `
      : null;
  }}
`;

const StyledDeleteCardButton = styled.input`
  background-color: #f55;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 900;

  &:hover {
    background-color: #f99;
  }
`;

const StyledTagsArea = styled.div`
  width: 90%;
  padding-left: 5%;
`;

const StyledText = styled.p`
  width: 90%;
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
`;

const StyledTagInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 2px dashed #448;
  font-size: 1rem;
`;

const StyledTagCreateButton = styled.input`
  margin: 0.5rem 0 0 0%;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #223;
  border-radius: 10px;
  background-color: #40cc90;
`;

const StyledPlusIcon = styled(PlusIcon)`
  height: 100%;
  width: 100%;
`;

const StyledPenIcon = styled(PenIcon)`
  height: 100%;
  width: 100%;
`;

const StyledSubmitButton = styled.button`
  position: fixed;
  bottom: 0;
  width: 90%;
  height: 60px;
  margin: 30px 0 30px 5%;
  border: 2px solid #223;
  border-radius: 10px;
  background: ${({ editMode }) => (editMode ? "#4090cc" : "#40cc90")};
`;
//#endregion
