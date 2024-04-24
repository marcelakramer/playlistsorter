<template>
    <div class="h-screen bg-primary d-flex flex-column align-center pt-16">
        <v-btn flat class="bg-primary" height="64" width="64">
            <v-icon class="text-h2">mdi-autorenew</v-icon>
        </v-btn>
        <p class="font-small font-italic pt-8">*The playlist must be on your profile.</p>
        <p class="font-small font-italic">*The playlist can’t have more than 100 tracks for the sorting to work properly.</p>
        <div v-for="playlist of playlists" :key="playlist.id" class="d-flex flex-column w-50 pt-16">
            <v-card height="96" class="bg-secondary d-flex align-center pa-4">
                <img height="64" width="64" :src="playlist.image">
                <div class="d-flex justify-space-between w-100">
                    <div>
                        <p class="font-normal font-weight-bold pl-8">{{ playlist.name }} <span class="ml-2 font-smaller">({{ playlist.number_of_tracks }} tracks)</span></p>
                    </div>
                    <v-btn flat class="bg-secondary" height="32" width="32" @click="dialog = true">
                        <v-icon class="text-h4">mdi-sort</v-icon>
                    </v-btn>
                </div>
            </v-card>
        </div>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        class="bg-primary py-8 px-16 ma-auto w-50"
      >
        <div class="d-flex flex-column align-center">
            <p class="font-sub-title font-weight-bold">Are you sure?</p>
            <div class="font-small pt-6">
                <p>This action is <span class="font-weight-bold">irreversible</span>.</p>
                <p class="pt-3"> Once you have done it, the playlist cannot be reversed to its original order automatically.</p>
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
                @click="dialog = false"
            ></v-btn>
          </div>
      </v-card>
    </v-dialog>
    </div>
</template>

<script setup>

const dialog = ref(false);
const playlists = ref([
    {
        id: 1,
        name: "when the box opens",
        number_of_tracks: 85,
        image: "../path/to/image.png"
    },
    {
        id: 2,
        name: "damn you, jane",
        number_of_tracks: 42,
        image: "../path/to/image.png"
    }
])
  
const spotifyAPIStore = useSpotifyAPIStore();
const refreshTokenResponse = ref();
  
onMounted(async () => {
  if (new Date(spotifyAPIStore.expiresAt) < new Date()){
      refreshTokenResponse.value  = await getAccessTokenByRefreshToken(spotifyAPIStore.refreshToken)
      if (refreshTokenResponse.value !== undefined) {
        spotifyAPIStore.setAccessToken(refreshTokenResponse.value.access_token);
        spotifyAPIStore.setExpiresAt(getExpiresAt(refreshTokenResponse.value.expires_in));
      }
    }
})

</script>