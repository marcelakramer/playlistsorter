<template>
    <div class="bg-primary d-flex flex-column align-center text-center pt-16 px-8">
        <v-btn flat class="bg-primary" height="64" width="64" @click="getPlaylists()">
            <v-icon class="text-h2">mdi-autorenew</v-icon>
        </v-btn>
        <p class="font-small font-italic pt-8">*You must be the owner of the playlist.</p>
        <p class="font-small font-italic">*The playlist must be on your profile.</p>
        <p class="font-small font-italic">*The playlist can’t have more than 100 tracks for the sorting to work properly.</p>
        <p class="font-small font-italic">*Don't reload or close the browser while the playlist is being sorted.</p>
        <v-progress-circular v-if=isLoading class="mt-16" indeterminate :size="70"></v-progress-circular>
        <div class="pt-8 pb-16">
            <div v-for="playlist of playlists" :key="playlist.id" class="d-flex justify-center align-center ma-auto flex-wrap pt-8">
            <v-card height="auto" class="bg-secondary d-flex align-center w-100 pa-4">
                <img height="64" width="64" :src="playlist.image">
                <div class="d-flex justify-space-between w-100">
                    <div>
                        <p class="font-normal font-weight-bold pl-8">{{ playlist.name }} <span class="ml-2 font-smaller">({{ playlist.number_of_tracks }} tracks)</span></p>
                    </div>
                    <div>
                        <v-progress-circular v-if="selectedPlaylistId === playlist.id && isSorting" indeterminate :size="25"></v-progress-circular>
                        <v-btn flat class="bg-secondary pa-2" height="32" width="32" @click="selectedPlaylistId = playlist.id; dialog = true">
                            <v-icon class="text-h4">mdi-sort</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </div>
        </div>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        class="bg-primary py-8 px-16 ma-auto"
      >
        <div class="d-flex flex-column align-center">
            <p class="font-sub-title font-weight-bold">Are you sure?</p>
            <div class="font-small pt-6">
                <p>This action is <span class="font-weight-bold">irreversible</span>.</p>
                <p class="pt-3"> Once you have done it, the playlist cannot be reversed to its playlist order automatically.</p>
            </div>
        </div>
          <div class="d-flex justify-center pt-6">
            <v-btn
                class="text-none bg-primary mx-1 font-weight-bold"
                border="fontprimary md"
                text="No"
                @click="dialog = false"
            ></v-btn>
            <v-btn
                class="text-none bg-fontprimary mx-1 font-weight-bold"
                text="Yes"
                @click="updateSelectedPlaylistOrder(selectedPlaylistId); dialog = false"
            ></v-btn>
          </div>
      </v-card>
    </v-dialog>
    </div>
</template>

<script setup lang="ts">

const dialog = ref(false);
const isLoading = ref(false);
const playlists = ref();
const selectedPlaylistId = ref('');
const isSorting = ref(false);
const spotifyAPIStore = useSpotifyAPIStore();
const refreshTokenResponse = ref();
const playlistsResponse = ref();
  
onMounted(async () => {
    if (new Date(spotifyAPIStore.expiresAt) < new Date()) {
      refreshTokenResponse.value  = await getAccessTokenByRefreshToken(spotifyAPIStore.refreshToken)
      if (refreshTokenResponse.value !== undefined) {
        spotifyAPIStore.setAccessToken(refreshTokenResponse.value.access_token);
        spotifyAPIStore.setExpiresAt(getExpiresAt(refreshTokenResponse.value.expires_in));
      }
    }
    getPlaylists();
})

const getPlaylists = async () => {
    playlists.value = [];
    isLoading.value = true;
    playlistsResponse.value = await getUserPlaylists(spotifyAPIStore.accessToken);
    playlists.value = playlistsResponse.value.items.map(
        (playlist: { id: string; name: string; tracks: { total: number; }; images: { url: string; }[]; }) => ({
                        id: playlist.id,
                        name: playlist.name,
                        number_of_tracks: playlist.tracks.total,
                        image: playlist.images[0].url
                      }
                    )
    );
    isLoading.value = false;
}

const updateSelectedPlaylistOrder = async (playlistId: string) => {
    isSorting.value = true;
    await updatePlaylistOrder(spotifyAPIStore.accessToken, playlistId);
    selectedPlaylistId.value = '';
    isSorting.value = false;
}

</script>