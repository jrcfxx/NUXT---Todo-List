import {useAuthStore} from '~/store/authStore' 

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();

    const token = store.getTokenFromStorage(); 

    if (token) {
        store.getUserInfo().then(response => {
            if (!response) {
            store.cleanStore();
            return navigateTo('/');}})
    } else {
        if (to.path !== '/') {
            return navigateTo('/');
    }
    }
});
