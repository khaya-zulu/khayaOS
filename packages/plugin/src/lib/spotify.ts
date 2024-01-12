/* eslint-disable turbo/no-undeclared-env-vars */
import querysrring from "querystring";

export const getAccessToken = async () => {
  const basic = Buffer.from(
    `${import.meta.env.SPOTIFY_CLIENT_ID}:${
      import.meta.env.SPOTIFY_CLIENT_SECRET
    }`
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querysrring.stringify({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json() as Promise<{ access_token: string }>;
};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.json();
  }
};
