const URL = 'https://api.spotify.com/v1/me/playlists'

export const getUserPlaylists = async (accessToken: string) => {
    const response = await $fetch(URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      return response
}