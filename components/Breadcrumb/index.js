import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const Breadcrumb = () => {
  const [breadcrumbText, setBreadcrumbText] = useState("");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
  //#endregion

  //#region Breadcrumb text setup
  useEffect(() => {
    (routePath = "") => {
      if (routePath === "/") {
        setBreadcrumbText("Dashboard");
      } else {
        setBreadcrumbText("Unknown");
      }
    };
  }, [routePath]);
  //#endregion

  return <StyledBreadcrumb>{breadcrumbText}</StyledBreadcrumb>;
};

const StyledBreadcrumb = styled.p`
  text-align: center;
  border-top: 2px solid;
  border-bottom: 2px solid;
  padding: 5px;
`;

export default Breadcrumb;
