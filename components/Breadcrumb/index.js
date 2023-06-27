import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const [breadcrumbText, setBreadcrumbText] = useState("Loading..");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
  const { folderId } = router.query;
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
            // Get folder by id
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
        default:
          setBreadcrumbText("Unknown Page");
          break;
      }
    })(routePath);
  }, [routePath, folderId]);
  //#endregion

  return <StyledBreadcrumb>{breadcrumbText}</StyledBreadcrumb>;
};

export default Breadcrumb;

const StyledBreadcrumb = styled.p`
  text-align: center;
  border-top: 2px solid #223;
  border-bottom: 2px solid #223;
  padding: 5px;
`;
