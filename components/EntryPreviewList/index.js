// Hooks
import { useState, useEffect } from "react";
// Components
import EntryPreview from "../EntryPreview";

const EntryPreviewList = ({ recentEntries, hasData }) => {
  const [entries, setEntries] = useState([]);

  //#region Get entries from database
  useEffect(() => {
    (async () => {
      try {
        //#region Get # most recent entries
        if (recentEntries) {
          const response = await fetch(
            `/api/entries?recentEntries=${recentEntries}`
          );

          if (response.ok) {
            const jsonData = await response.json();
            const cleanData = jsonData.data;
            setEntries(cleanData);
            hasData(cleanData);
          }
        }
        //#endregion
        //#region Get all entries
        else {
          const response = await fetch("/api/entries");

          if (response.ok) {
            const jsonData = await response.json();
            const cleanData = jsonData.data;
            setEntries(cleanData);
            hasData(cleanData);
          }
        }
        //#endregion
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    })();
  }, []);
  //#endregion

  if (!entries) return <p>Loading entries..</p>;

  return entries.map((entryData) => {
    return <EntryPreview key={entryData._id} entryData={entryData} />;
  });
};

export default EntryPreviewList;
