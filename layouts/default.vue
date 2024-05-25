<template>
    <div class="d-flex flex-column">
        <div class="bg-primary d-flex justify-end pt-6 pr-8">
            <v-btn class="bg-primary" flat
                :icon="!theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
                @click="toggleTheme"></v-btn>
        </div>
        <ErrorSnackbar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}

</script>