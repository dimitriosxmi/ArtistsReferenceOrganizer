import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
// Components
import DeleteRequest from "../DeleteRequest";

const DeleteButton = ({ text, deleteAPIUrl, folderId }) => {
  const [isRequestingDelete, setIsRequestingDelete] = useState(false);

  return (
    <>
      <StyledButton
        type="button"
        onClick={() => {
          setIsRequestingDelete(!isRequestingDelete);
        }}
      >
        ❌ Delete {text}
      </StyledButton>
      {isRequestingDelete ? (
        <DeleteRequest
          text={text.toLowerCase()}
          setIsRequestingDelete={setIsRequestingDelete}
          deleteAPIUrl={deleteAPIUrl}
          folderId={folderId ? folderId : null}
        />
      ) : null}
    </>
  );
};

export default DeleteButton;

const StyledButton = styled.button`
  position: absolute;
  top: 110px;
  right: 10px;
  border-radius: 10px;
  background: #faa;
  border: 2px solid #223;
  font-size: 1.5rem;
`;
