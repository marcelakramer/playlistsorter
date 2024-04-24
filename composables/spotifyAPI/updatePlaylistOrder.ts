import type { Track } from "~/interfaces/spotifyAPI/track";
import type { FilteredTrack } from "~/interfaces/spotifyAPI/filteredTrack";

export const updatePlaylistOrder = async (accessToken: string, playlistId: string) => {
    const tracksPromise = getTracks(accessToken, playlistId);
    const tracks = await tracksPromise;
    const filteredTracks = transformTracks(tracks.items as { track: Track }[]);
    let filteredTracksOriginalOrder = [...filteredTracks];
    const tracksByArtist = groupTracksByArtist(filteredTracks);
    const sortedArtists = sortArtists(Object.keys(tracksByArtist));
    const sortedTracks = sortTracks(tracksByArtist, sortedArtists);
    const reverseSortedTracks = [...sortedTracks].reverse()

    for (const track of reverseSortedTracks) {
        const rangeStart = filteredTracksOriginalOrder.indexOf(track);
        const insertBefore = 0;
        const rangeLength = 1;
        await updateTrackPositionInPlaylist(accessToken, playlistId, rangeStart, insertBefore, rangeLength);
        filteredTracksOriginalOrder = updateFilteredTracksOriginalOrder(filteredTracksOriginalOrder, rangeStart);
    }
};

const getTracks = async (accessToken: string, playlistId: string) => {
    const tracks = await getPlaylistTracks(accessToken, playlistId);
    return tracks as { items: { track: Track }[] };
};

const updateFilteredTracksOriginalOrder = (array: FilteredTrack[], position: number) => {
    const trackToMove = array.splice(position, 1)[0];
    array.unshift(trackToMove);
    return array;
}

const transformTracks = (tracks: { track: Track }[]) => {
    return tracks.map(item => {
        const track = item.track;
        return {
            album: track.album.name,
            album_type: track.album.album_type,
            release_date: track.album.release_date,
            position_in_album: track.track_number,
            title: track.name,
            artist: track.artists[0].name,
        };
    });
};

const groupTracksByArtist = (filteredTracks: FilteredTrack[]) => {
    const tracksByArtist: { [key: string]: FilteredTrack[] } = {};
    filteredTracks.forEach(track => {
        const artist = track.artist;
        if (!tracksByArtist[artist]) {
            tracksByArtist[artist] = [];
        }
        tracksByArtist[artist].push(track);
    });
    return tracksByArtist;
};

const sortArtists = (artists: string[]) => {
    return artists.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
};

const sortTracks = (tracksByArtist: { [key: string]: FilteredTrack[] }, sortedArtists: string[]) => {
    const sortedTracks: FilteredTrack[] = [];
    sortedArtists.forEach(artist => {
        tracksByArtist[artist].sort((a, b) => {
            if (a.album_type === 'single' && b.album_type !== 'single') {
                return 1;
            }
            if (a.album_type !== 'single' && b.album_type === 'single') {
                return -1;
            }
            if (a.release_date === b.release_date) {
                return a.position_in_album - b.position_in_album;
            }
            return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        });
        sortedTracks.push(...tracksByArtist[artist]);
    });
    return sortedTracks;
};