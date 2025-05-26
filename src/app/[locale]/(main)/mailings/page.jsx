// "use client";

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "next/navigation";

// import Banner from "@/components/Banner";
// import Mailing from "@/components/Mailing";
// import Pagination from "@/components/Pagination";
// import MailingSkeleton from "@/components/skeletons/MailingSkeleton";
// import { events, track } from "@/metrics";
// import { fetchMailings, resetState } from "@/store/slices/mailingsPageSlice";
// import { useLocale } from "next-intl";

// function Mailings() {
//   const dispatch = useDispatch();
//   const locale = useLocale();

//   const {
//     data: { pagesTotal, mailings, page },
//     isLoading,
//   } = useSelector((state) => state.mailingsPage);

//   const searchParams = useSearchParams();

//   const handlePageChange = (newPage) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", newPage.toString());

//     dispatch(fetchMailings({ page: newPage, locale }));
//   };

//   useEffect(() => {
//     const pageFromQuery = Number(searchParams.get("page")) || page;
//     dispatch(fetchMailings({ page: pageFromQuery, locale }));

//     return () => {
//       dispatch(resetState());
//     };
//   }, [dispatch, locale]);

//   useEffect(() => {
//     if (!mailings[0]) {
//       return;
//     }

//     track(events.mailingsPage.shown, { page });
//   }, [mailings]);

//   return (
//     <Box>
//       <Banner sx={{ mb: "16px", mt: "-16px" }} location="mailings" />
//       <Grid container spacing={3}>
//         {mailings.map((props, i) => (
//           <Grid
//             key={i}
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             lg={3}
          
//           >
//             {!isLoading && props ? <Mailing {...props} /> : <MailingSkeleton />}
//           </Grid>
//         ))}
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
//         <Pagination
//           current={page}
//           to={pagesTotal}
//           handlePageChange={handlePageChange}
//         />
//       </Box>
//     </Box>
//   );
// }

// export default Mailings;


"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

import Banner from "@/components/Banner";
import Mailing from "@/components/Mailing";
import Pagination from "@/components/Pagination";
import MailingSkeleton from "@/components/skeletons/MailingSkeleton";
import { events, track } from "@/metrics";
import { fetchMailings, resetState } from "@/store/slices/mailingsPageSlice";
import { useLocale } from "next-intl";

function Mailings() {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const {
    data: { pagesTotal, mailings, page: pageFromState },
    isLoading,
  } = useSelector((state) => state.mailingsPage);

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchMailings({ page: currentPage, locale }));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, currentPage, locale]);

  useEffect(() => {
    if (mailings.length > 0) {
      track(events.mailingsPage.shown, { page: currentPage });
    }
  }, [mailings, currentPage]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <Box>
      {/* <Banner sx={{ mb: "16px", mt: "-16px" }} location="mailings" /> */}
      <Grid container spacing={3}  justifyContent="center">
        {(isLoading ? Array(8).fill(null) : mailings).map((props, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}   >
            {props ? <Mailing {...props}/> : <MailingSkeleton />}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
        <Pagination
          current={currentPage}
          to={pagesTotal}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default Mailings;
