<template>
    <v-snackbar v-model="errorStore.showError" timeout="3000" location="top" rounded="xs" color="error" class="mt-10" @click="errorStore.clearError">
        {{ errorStore.error }}
        <template v-slot:actions>
            <v-btn @click="errorStore.clearError">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
const errorStore = useErrorStore();
</script>