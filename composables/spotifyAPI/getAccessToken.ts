import type { AccessTokenResponse } from "~/interfaces/spotifyAPI/accessTokenResponse";

export const getAccessToken = async (code: string) => {
    const config = useRuntimeConfig();
    const response: AccessTokenResponse = await $fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${config.public.CLIENT_ID}:${config.public.CLIENT_SECRET}`)
      },
      body: new URLSearchParams({
          code: code,
          redirect_uri: config.public.REDIRECT_URI,
          grant_type: 'authorization_code'
        }).toString()
    })
    return response
}