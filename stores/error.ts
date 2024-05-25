export const useErrorStore = defineStore('error', {
    state: () => ({
        error: null as Error | null,
        showError: false,
    }),
    actions: {
        setError(error: Error) {
            this.error = error;
            this.showError = true;
        },
        clearError() {
            this.error = null;
            this.showError = false;
        },
    },
});
