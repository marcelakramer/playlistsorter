const URL = "https://api.spotify.com/v1/me/playlists";

export const getUserPlaylists = async (accessToken: string) => {
  const nuxtApp = useNuxtApp();
  try {
    const response = await $fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch {
    nuxtApp.callHook(
      "app:error",
      createError("Could not get user's playlists."),
    );
  }
};
