import styled from "styled-components";
// Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const [breadcrumbText, setBreadcrumbText] = useState("");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
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
        default:
          setBreadcrumbText("Unknown Page");
          break;
      }
    })(routePath);
  }, [routePath]);
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
