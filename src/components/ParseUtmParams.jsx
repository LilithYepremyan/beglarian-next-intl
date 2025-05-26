import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUtmParams } from "@/store/slices/utmSlice";
import { useSearchParams } from "next/navigation";

export default function ParseUtmParams() {
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const utmMailing = searchParams.get("utm_mailing") || undefined;
  const utmSource = searchParams.get("utm_source") || undefined;
  const utmMedium = searchParams.get("utm_medium") || undefined;
  const utmCampaign = searchParams.get("utm_campaign") || undefined;
  const utmTerm = searchParams.get("utm_term") || undefined;
  const utmContent = searchParams.get("utm_content") || undefined;
  const utmLanding =
    searchParams.get("utm_landing") ||
    searchParams.get("utm-landing") ||
    undefined;

  const utm = {
    ...(utmMailing && { utmMailing }),
    ...(utmSource && { utmSource }),
    ...(utmMedium && { utmMedium }),
    ...(utmCampaign && { utmCampaign }),
    ...(utmTerm && { utmTerm }),
    ...(utmContent && { utmContent }),
    ...(utmLanding && { utmLanding }),
  };

  useEffect(() => {
    dispatch(setUtmParams(utm));
  }, []);

  return <></>;
}
