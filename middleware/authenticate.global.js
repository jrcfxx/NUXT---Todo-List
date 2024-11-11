import { useAuthStore } from '~/store/authStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  
  const token = authStore.getTokenFromStorage();

  if (token) {
    const userInfo = await authStore.getUserInfo();
    if (!userInfo) {
      authStore.cleanStore();
      return navigateTo('/');
    }
  } else {
    if (to.path !== '/') {
      return navigateTo('/');
    }
  }
});
