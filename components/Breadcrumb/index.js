import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const [breadcrumbText, setBreadcrumbText] = useState("Loading..");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
  const routerParams = router.query;
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
        case `/folder/${routerParams.folderId}`:
          (async () => {
            // Get folder by id
            const response = await fetch(
              `/api/folder?folderId=${routerParams.folderId}`
            );

            if (response.ok) {
              // Refine data
              const jsonData = await response.json();
              const cleanData = jsonData.data;
              const folderName = cleanData.folderName;

              setBreadcrumbText(`Dashboard/ folder/ ${folderName}`);
            }
          })();
          break;
        default:
          setBreadcrumbText("Unknown Page");
          break;
      }
    })(routePath);
  }, [routePath, routerParams]);
  //#endregion

  return <StyledBreadcrumb>{breadcrumbText}</StyledBreadcrumb>;
};

const StyledBreadcrumb = styled.p`
  text-align: center;
  border-top: 2px solid #223;
  border-bottom: 2px solid #223;
  padding: 5px;
`;

export default Breadcrumb;
