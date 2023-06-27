import styled from "styled-components";
// Hooks
import { useRouter } from "next/router";
// SVGs
import { PlusIcon } from "../svgs";

const NewEntryForm = () => {
  const router = useRouter();
  const { folderId } = router.query;

  return (
    <form onSubmit={handleOnSubmit}>
      <StyledInput
        type="text"
        name="entryName"
        placeholder="Enter here your entry name."
        required
      />
      <br />
      <StyledSubmitButton type="submit">
        <StyledPlusIcon />
      </StyledSubmitButton>
    </form>
  );

  async function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.entryUploadDate = new Date().valueOf();
    !data.entrySelectedFolder && folderId
      ? (data.entrySelectedFolder = folderId)
      : null;
    const response = await fetch("/api/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      if (folderId) {
        router.push(`/folder/${folderId}`);
        return;
      }
      router.push("/");
    }
  }
};

export default NewEntryForm;

const StyledInput = styled.input`
  margin: 20px 0 20px 5%;
  border: 2px dashed #448;
  width: 90%;
  height: 2rem;
  padding: 0.5rem;
  text-overflow: ellipsis;
`;

const StyledPlusIcon = styled(PlusIcon)`
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
  background: #40cc90;
`;
