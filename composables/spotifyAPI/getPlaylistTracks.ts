const URL = "https://api.spotify.com/v1/playlists/";

export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
) => {
  const nuxtApp = useNuxtApp();
  try {
    const response = await $fetch(URL + playlistId + "/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch {
    nuxtApp.callHook(
      "app:error",
      createError(`Could not get playlist tracks.`),
    );
  }
};
