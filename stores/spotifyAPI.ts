export const useSpotifyAPIStore = defineStore("spotifyAPI", {
    state: () => {
        return {
            auth: false,
            accessToken: '',
            refreshToken: '',
            expiresAt: ''
        }
    },
    actions: {
        changeAuth(value: boolean) {
            this.auth = value;
        },
        setAccessToken(newAccessToken: string) {
            this.accessToken = newAccessToken;
        },
        setRefreshToken(newRefreshToken: string) {
            this.refreshToken = newRefreshToken;
        },
        setExpiresAt(newExpiresAt: string) {
            this.expiresAt = newExpiresAt;
        }
    },
    persist: {
        storage: persistedState.localStorage
    }
})