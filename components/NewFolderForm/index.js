import styled from "styled-components";
// Hooks
import { useState } from "react";
import { useRouter } from "next/router";
// SVGs
import { FolderIcon, PlusIcon } from "../svgs";

const NewFolderForm = () => {
  const router = useRouter();
  const [folderColor, setFolderColor] = useState("#38b");

  return (
    <form onSubmit={handleOnSubmit}>
      <StyledFolderIcon foldercolor={folderColor} />
      <StyledInput
        type="text"
        name="folderName"
        placeholder="Enter here your folder name."
        required
      />
      <StyledButtons>
        <StyledColorPickButton
          colorvalue={"#38b"}
          onClick={() => handleOnClickColorPick("#38b")}
          type="button"
        />
        <StyledColorPickButton
          colorvalue={"#96c"}
          onClick={() => handleOnClickColorPick("#96c")}
          type="button"
        />
        <StyledColorPickButton
          colorvalue={"#ea3"}
          onClick={() => handleOnClickColorPick("#ea3")}
          type="button"
        />
      </StyledButtons>
      <StyledSubmitButton type="submit">
        <StyledPlusIcon />
      </StyledSubmitButton>
    </form>
  );

  //#region hanlder functions
  function handleOnClickColorPick(color) {
    setFolderColor(color);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // Add selected folderColor to data.
    const fullData = { ...data, folderColor: folderColor };

    // POST the folder.
    const response = await fetch("/api/folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullData),
    });

    if (response.ok) {
      router.push("/");
    }
  }
  //#endregion
};

export default NewFolderForm;

//#region Styled Objects
const StyledFolderIcon = styled(FolderIcon)`
  color: ${({ foldercolor }) => foldercolor};
  width: 50%;
  height: 50vw;
  margin: -60px 0 0 25%;
`;

const StyledInput = styled.input`
  margin: 20px 0 20px 5%;
  border: 2px dashed #448;
  width: 90%;
  height: 2rem;
  padding: 0.5rem;
  text-overflow: ellipsis;
`;

const StyledButtons = styled.div`
  margin: 20px 0 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledColorPickButton = styled.button`
  width: 15vw;
  height: 15vw;
  border-radius: 100%;
  border: 2px dashed #223;
  background: ${({ colorvalue }) => colorvalue};
`;

const StyledPlusIcon = styled(PlusIcon)`
  height: 100%;
  width: 100%;
`;

const StyledSubmitButton = styled.button`
  position: fixed;
  bottom: 0;
  margin: 30px 0 30px 5%;
  width: 90%;
  height: 60px;
  border: 2px solid #223;
  border-radius: 10px;
  background: #1cd777;
`;
//#endregion
