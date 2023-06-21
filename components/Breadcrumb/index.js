import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const Breadcrumb = () => {
  const [breadcrumb, setBreadcrumb] = useState("");

  //#region Router
  const router = useRouter();
  const routePath = router.asPath;
  //#endregion

  //#region Breadcrumb text setup
  useEffect(() => {
    function SetBreadcrumb(path = "") {
      if (path === "/") {
        setBreadcrumb("Dashboard");
      } else {
        setBreadcrumb("Unknown");
      }
    }

    SetBreadcrumb(routePath);
  }, [routePath]);
  //#endregion

  return <StyledBreadcrumb>{breadcrumb}</StyledBreadcrumb>;
};

const StyledBreadcrumb = styled.p`
  text-align: center;
  border-top: 2px solid;
  border-bottom: 2px solid;
  padding: 5px;
`;

export default Breadcrumb;
