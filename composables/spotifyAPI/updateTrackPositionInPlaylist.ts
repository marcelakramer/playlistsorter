const URL = 'https://api.spotify.com/v1/playlists/'

export const updateTrackPositionInPlaylist = async (accessToken: string, playlistId: string, rangeStart: number, insertBefore: number, rangeLength: number) => {
  try {
    await $fetch(URL + playlistId + "/tracks", {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        range_start: rangeStart,
        insert_before: insertBefore,
        range_length: rangeLength
      })
    });
  } catch {
    throw new Error(`Could not update position of last track in playlist.`);
  }
}