<template>
    <div class="h-screen bg-primary d-flex flex-column align-center pt-16">
        <h1 class="mt-16 text-h1 font-weight-bold">playlist sorter</h1>
        <p class="mt-8 mb-16 text-h6 font-weight-light">organize your playlists effortlessly.</p>
        <v-btn height="60" width="240" rounded="md" class="mt-16 bg-primary text-none" border="fontprimary md">
            <p style="font-size: 1.1rem;" class="font-weight-bold">login with</p>
            <v-img v-if="theme.global.current.value.dark" class="ml-2" src="../assets/images/spotify/Spotify_Logo_RGB_White.png" height="32" width="96"></v-img>
            <v-img v-else class="ml-2" src="../assets/images/spotify/Spotify_Logo_RGB_Black.png" height="32" width="96"></v-img>
        </v-btn>
    </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

</script>