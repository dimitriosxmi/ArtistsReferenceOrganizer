import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const [breadcrumbText, setBreadcrumbText] = useState("Loading..");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
  const { folderId, entryId } = router.query;
  //#endregion

  //#region Breadcrumb text setup
  useEffect(() => {
    ((routePath) => {
      switch (routePath) {
        case "/":
          setBreadcrumbText("Dashboard");
          break;
        case "/content":
          setBreadcrumbText("Content");
          break;
        case "/new-folder":
          setBreadcrumbText("(NEW FOLDER)");
          break;
        case "/new-entry":
          setBreadcrumbText("(NEW ENTRY)");
          break;
        case `/folder/${folderId}`:
          (async () => {
            // Get folder by id.
            const response = await fetch(`/api/folder?folderId=${folderId}`);

            if (response.ok) {
              // Nested destructure the folderName out of data.
              const {
                data: { folderName },
              } = await response.json();

              setBreadcrumbText(`Dashboard/ folder/ ${folderName}`);
            }
          })();
          break;
        case `/${entryId}`:
          (async () => {
            // Get entry by id.
            const response = await fetch(`/api/entry?entryId=${entryId}`);

            if (response.ok) {
              // Nested destructure the entryName out of data.
              const {
                data: { entryName },
              } = await response.json();

              setBreadcrumbText(`Dashboard/ ${entryName}`);
            }
          })();
          break;
        default:
          setBreadcrumbText("Unknown Page");
          break;
      }
    })(routePath);
  }, [routePath, folderId, entryId]);
  //#endregion

  return <StyledBreadcrumb>{breadcrumbText}</StyledBreadcrumb>;
};

export default Breadcrumb;

const StyledBreadcrumb = styled.p`
  max-width: 100%;
  padding: 5px;
  border-top: 2px solid #223;
  border-bottom: 2px solid #223;
  text-align: center;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
