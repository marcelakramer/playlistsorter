import { useErrorStore } from "~/stores/error";

export default defineNuxtPlugin((nuxtApp) => {
  const errorStore = useErrorStore();
  nuxtApp.hook("app:error", (error) => {
    errorStore.setError(error);
  });
});
