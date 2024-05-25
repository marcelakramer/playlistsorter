export default defineNuxtRouteMiddleware((to) => {
    const spotifyAPIStore = useSpotifyAPIStore();

    if (to.path === "/playlists" && !spotifyAPIStore.isAuhorized) {
        return navigateTo("/");
    }
})