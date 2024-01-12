import type { APIRoute } from "astro";

import { getCurrentlyPlaying } from "../../lib/spotify.ts";

export const GET: APIRoute = async () => {
  const data = await getCurrentlyPlaying();
  return new Response(
    JSON.stringify({
      songCover: data?.item?.album?.images[0]?.url,
      songName: data?.item?.name,
      songArtists: data?.item?.artists.map((artist: any) => artist.name),
      songUrl: data?.item?.external_urls.spotify,
      isPlaying: data?.is_playing,
      duration: data?.item?.duration_ms,
      progress: data?.progress_ms,
    })
  );
};
