/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import { createInstance, Identify } from "@amplitude/analytics-browser";
import { useEffect } from "react";

import { getExperiment } from "@/utils/abTesting";
import isMobile from "@/utils/isMobile";
import { useLocale } from "next-intl";

let setUserInfo = () => {};
let Track = () => {};
let track = () => {};

const init = () => {
  const currentLang = useLocale();

  if (process.env.AMPLITUDE_API_KEY) {
    const userAgent = navigator?.userAgent || "";

    let browser = "unknown";

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browser = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browser = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browser = "safari";
    } else if (userAgent.match(/opr/i)) {
      browser = "opera";
    } else if (userAgent.match(/edg/i)) {
      browser = "edge";
    }

    const experiment = getExperiment();

    const isMobileBrowser = isMobile();

    const commonProps = {
      browser,
      experiment,
      isMobile: isMobileBrowser,
      locale: currentLang,
    };

    const amplitude = createInstance();

    const pageViewTrackingEnrichment = () => ({
      name: "page-view-tracking-enrichment",
      type: "enrichment",
      setup: async () => undefined,
      execute: async (event) => {
        event.event_properties = {
          ...event.event_properties,
          ...commonProps,
        };

        return event;
      },
    });

    amplitude.add(pageViewTrackingEnrichment());

    amplitude.init(process.env.AMPLITUDE_API_KEY, {
      flushIntervalMillis: 1000,
      defaultTracking: {
        attribution: true,
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: false,
      },
    });

    setUserInfo = (userInfo) => {
      const identifyEvent = new Identify();

      const {
        email,
        firstOrder,
        originalUtm,
        otherOrder,
        reservationTimeoutInMinutes,
        userGroup,
        userMinimalOrder,
        userId,
      } = userInfo;

      const userProps = {
        email,
        firstOrder,
        originalUtm,
        otherOrder,
        reservationTimeoutInMinutes,
        userGroup,
        userMinimalOrder,
      };

      if (process.env.MODE === "development" || process.env.MODE === "test") {
        console.log("AMPLITUDE IDENTIFY:", { ...userProps });
      }

      if (userId) {
        amplitude.setUserId(userId);
      }

      identifyEvent.set("email", email);
      identifyEvent.set("firstOrder", firstOrder);
      identifyEvent.set("originalUtm", originalUtm);
      identifyEvent.set("otherOrder", otherOrder);
      identifyEvent.set(
        "reservationTimeoutInMinutes",
        reservationTimeoutInMinutes
      );
      identifyEvent.set("userGroup", userGroup);
      identifyEvent.set("userMinimalOrder", userMinimalOrder);

      amplitude.identify(identifyEvent);
    };

    track = (eventName, eventProps) => {
      const path = window.location?.pathname;
      const search = window.location?.search;

      const propsToTrack = { ...eventProps, search, path };

      if (process.env.MODE === "development" || process.env.MODE === "test") {
        console.log("AMPLITUDE TRACK:", `react_${eventName}`, {
          ...propsToTrack,
          ...commonProps,
        });
      }

      amplitude.track(`react_${eventName}`, propsToTrack);
    };

    Track = ({ eventName, eventProps, once = true }) => {
      if (once) {
        useEffect(() => {
          track(eventName, eventProps);
        }, []);
      } else {
        useEffect(() => {
          track(eventName, eventProps);
        });
      }

      return <></>;
    };
  }
};

export default track;

export { setUserInfo, Track, track, init };
