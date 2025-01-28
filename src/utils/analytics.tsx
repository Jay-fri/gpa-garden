import ReactGA from "react-ga4";

const initializeAnalytics = (trackingId: string): void => {
  ReactGA.initialize(trackingId);
};

const logPageView = (pagePath: string): void => {
  ReactGA.send({ hitType: "pageview", page: pagePath });
};

export { initializeAnalytics, logPageView };
