// Hooks
import { useState, useEffect } from "react";
// Components
import EntryPreview from "../EntryPreview";

const EntryPreviewList = ({ recentEntriesAmount, hasData, folderId }) => {
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

  return entries.map((entryData) => {
    return <EntryPreview key={entryData._id} entryData={entryData} />;
  });
};

export default EntryPreviewList;
