import {useAuthStore} from '~/store/authStore' 

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    const token = authStore.getTokenFromStorage(); 

    if (token) {
            authStore.getUserInfo().then(response => {
            if (!response) {
            authStore.cleanStore();
            return navigateTo('/');}})
    } else {
        if (to.path !== '/') {
            return navigateTo('/');
    }
    }
});
