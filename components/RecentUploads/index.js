import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const RecentUploads = () => {
  const [text, setText] = useState("Recent Uploads");
  const [data, setData] = useState([]);

  useEffect(() => {
    data.length > 0
      ? setText("Recent Uploads")
      : setText("No uploaded files yet");
  }, [data]);

  return (
    <section>
      <StyledRecentUploadsText>{text}</StyledRecentUploadsText>
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
`;
