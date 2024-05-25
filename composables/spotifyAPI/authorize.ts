export const authorize = async () => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: config.public.CLIENT_ID,
    scope: scope,
    redirect_uri: config.public.REDIRECT_URI,
    state: state
  });
  try {
    await navigateTo(`https://accounts.spotify.com/authorize?${queryParams.toString()}`, {
      external: true
    })
  } catch {
    nuxtApp.callHook("app:error", createError("Could not authorize in Spotify API."));
  }
}