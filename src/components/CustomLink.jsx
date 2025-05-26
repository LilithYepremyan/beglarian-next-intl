
"use client";

import MuiLink from "@mui/material/Link";
import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CustomLink = React.forwardRef(
  ({ passfrom, href = "#", ...props }, ref) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const fullPath = `${pathname}${
      searchParams ? "?" + searchParams.toString() : ""
    }`;

    const state = passfrom ? { from: fullPath } : null;

    return (
      <MuiLink
        sx={{ display: "inline-block" }}
        {...props}
        ref={ref}
        component={Link}
        href={href}
        passHref
        state={state}
      />
    );
  }
);

export default CustomLink;
