import { useAuthStore } from '~/store/authStore';
import { routePermissions } from '~/utils/permissions';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useAuthStore();


    // checks if the user permissions are not loaded or empty
    if (!store.getPermissions || store.getPermissions.length === 0) {
        try {
            const response = await store.getUserInfo(); 

            // invalid or error response, clears the store and redirects
            if (!response || response.error) {
                store.cleanStore();
                // if user tries to access a route other than home, redirects to home
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
    
    // iterate on routes that have associated permissions
    for (const path in routePermissions) {
        // check if the current route matches any route that has associated permissions 
        // or if the current route starts with that path.
        if (to.path === path || to.path.startsWith(path)) {
            const requiredPermission = routePermissions[path];

            if (!userPermissions.includes(requiredPermission)) {
                return navigateTo('/access-denied');  // Redirect to access-denied if no permission
            }

            return;
        }
    }
});
  
