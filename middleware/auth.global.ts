import {useAuthStore} from '~/store/authStore' 

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();

  
    if (process.client) {
        const token = store.loadFromLocalStorage(); 

        if (token) {
            try {
                const response = await store.getUserInfo();
                
                if (!response || response.error) {
                    store.cleanStore();
                    return navigateTo('/'); 
                }
            } catch (error) {
                alert('Session expired');
                store.cleanStore();
                return navigateTo('/');
            }
        } else {
            if (to.path !== '/') {
                return navigateTo('/');
            }
        }
    }
});
