import { useAuthStore } from '~/store/authStore';
import { routePermissions } from '~/utils/permissions';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    // Validate if the user has the required permissions for the route
    const userPermissions = authStore.getPermissions;
    
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
  
