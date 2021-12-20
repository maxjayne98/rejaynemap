export const aqicnAccessToken = process.env
  .REACT_APP_AQICN_ACCESS_TOKEN as string;
export const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string;

export const aqicnURLGenerator = (params: string) =>
  `${aqicnBaseURL}${params}token=${aqicnAccessToken}`;
