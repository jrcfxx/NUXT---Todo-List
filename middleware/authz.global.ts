import { useAuthStore } from '~/store/authStore';
import { routePermissions } from '~/utils/permissions';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();


    if (!store.getPermissions || store.getPermissions.length === 0) {
        try {
            const response = await store.getUserInfo(); 

            if (!response || response.error) {
                store.cleanStore();
                if (to.path !== '/') {
                    return navigateTo('/');  
                }
            }
        } catch (error) {
            store.cleanStore();
            if (to.path !== '/') {
                return navigateTo('/');  
            }
        }
    }

    // Validate if the user has the required permissions for the route
    const userPermissions = store.getPermissions;
    
    for (const path in routePermissions) {
        if (to.path === path || to.path.startsWith(path)) {
            const requiredPermission = routePermissions[path];

            if (!userPermissions.includes(requiredPermission)) {
                return navigateTo('/access-denied');  // Redirect to access-denied if no permission
            }

            return;
        }
    }
});
  
