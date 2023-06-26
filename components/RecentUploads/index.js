import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
// Components
import EntryPreviewList from "../EntryPreviewList";

const RecentUploads = () => {
  const [text, setText] = useState("Recent Uploads");
  const [data, setData] = useState([]);

  //#region Adapt the text based on data value
  useEffect(() => {
    data.length > 0
      ? setText("Recent Uploads")
      : setText("No uploaded files yet");
  }, [data]);
  //#endregion

  return (
    <section>
      <StyledRecentUploadsText>{text}</StyledRecentUploadsText>
      <EntryPreviewList recentEntries={20} hasData={setData} />
    </section>
  );
};

export default RecentUploads;

const StyledRecentUploadsText = styled.p`
  text-align: center;
  border-bottom: 2px dashed;
  padding-bottom: 5px;
  width: 90%;
  margin-left: 5%;
  margin-top: 100px;
`;
