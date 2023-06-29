import styled from "styled-components";
// Hooks
import { useRouter } from "next/router";

const DeleteRequest = ({
  text,
  setIsRequestingDelete,
  deleteAPIUrl,
  folderId,
}) => {
  const router = useRouter();

  return (
    <>
      <StyledDeleteRequestBox>
        <StyledText>Are you sure you want to delete this {text}.</StyledText>
        <StyledButtonContainer>
          <StyledButton deleteBtn onClick={() => handleOnClickDelete()}>
            Delete
          </StyledButton>
          <StyledButton onClick={() => handleOnClickCancel()}>
            Cancel
          </StyledButton>
        </StyledButtonContainer>
      </StyledDeleteRequestBox>
      <StyledBackground onClick={() => handleOnClickCancel()} />
    </>
  );

  // If folder id isn't provided, than just delete
  async function handleOnClickDelete() {
    folderId ? await handleUpdateRelatedEntries() : handleDeleteFolder();
  }

  async function handleUpdateRelatedEntries() {
    // PUT update entries.
    // (Triggers functionality on api end that deletes
    // entrySelectedFolder property from a selection of entries).
    const postResponse = await fetch(
      `/api/entries?selectedFolderId=${folderId}`,
      {
        method: "PUT",
      }
    );

    if (postResponse.ok) {
      handleDeleteFolder();
    }
  }

  async function handleDeleteFolder() {
    // Delete entry or folder. (depends on the provided api url)
    const response = await fetch(deleteAPIUrl, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  // Close delete request window.
  function handleOnClickCancel() {
    setIsRequestingDelete(false);
  }
};

export default DeleteRequest;

//#region Styled Objects
const StyledDeleteRequestBox = styled.div`
  z-index: 201;
  position: relative;
  top: 10px;
  left: 5%;
  width: 90%;
  border: 2px solid #223;
  border-radius: 10px;
  background-color: #faa;
`;

const StyledText = styled.p`
  z-index: 1;
  font-size: 1.5rem;
  text-align: center;
  width: 90%;
  margin: 5% 0 5% 5%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 0 5% 5%;
`;

const StyledButton = styled.button`
  width: 45%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  background-color: ${({ deleteBtn }) => (deleteBtn ? "#f55" : "#bbb")};
  border: 2px solid #223;
  border-radius: 10px;
`;

const StyledBackground = styled.div`
  z-index: 200;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #4489;
`;
//#endregion
