<template>
  <div class="h-screen bg-primary d-flex flex-column align-center pt-16">
    <h1 class="mt-16 font-title text-center">Redirecting...</h1>
    <v-progress-circular class="mt-12" indeterminate :size="70" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const spotifyAPIStore = useSpotifyAPIStore();
const code = ref();
const accessTokenResponse = ref();

onMounted(async () => {
  code.value = route.query.code;
  if (code.value !== undefined) {
    accessTokenResponse.value = await getAccessToken(code.value);
    if (accessTokenResponse.value) {
      spotifyAPIStore.setAccessToken(accessTokenResponse.value.access_token);
      spotifyAPIStore.setRefreshToken(accessTokenResponse.value.refresh_token);
      spotifyAPIStore.setExpiresAt(
        getExpiresAt(accessTokenResponse.value.expires_in),
      );
      spotifyAPIStore.changeAuth(true);
    } else {
      spotifyAPIStore.changeAuth(false);
    }
  }
  navigateTo("/playlists");
});
</script>
