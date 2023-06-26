// Hooks
import { useState, useEffect } from "react";
// Components
import EntryPreview from "../EntryPreview";

const EntryPreviewList = ({ recentEntriesAmount, hasData }) => {
  const [entries, setEntries] = useState([]);

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
            const jsonData = await response.json();
            const cleanData = jsonData.data;
            setEntries(cleanData);
            if (hasData) hasData(cleanData);
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
            if (hasData) hasData(cleanData);
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
