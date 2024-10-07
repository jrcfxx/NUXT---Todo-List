import {useAuthStore} from '~/store/authStore' 
import { routePermissions } from '~/utils/permissions';


export default defineNuxtRouteMiddleware (async (to, from) => {

    // check if the code is running on the server-side
    // ensure that the code is executed only on the client side, preventing unnecessary or invalid operations on the server
    if (process.server) {
        return;
    }

    const store = useAuthStore();
    await store.initializeStore();
    await nextTick(); // Ensure that the DOM updates finish before proceeding
    
    const auth = store.getIsLoginSuccessful;
    const permissions = store.getPermissions;

    if (!auth) {
        if (to.path !== '/') {
          return navigateTo('/');
        }
    }

    for (const path in routePermissions) {
        // check if the current route path matches or starts with a defined permission path in '~/utils/permissions'
        if (to.path === path || to.path.startsWith(path)) {
        const requiredPermission = routePermissions[path]; // get the required permission for the current route

        if (!permissions.includes(requiredPermission)) {
            return navigateTo('/access-denied');
        }
        return; // if the user has the permission, allow access to the route
        }
    }
});

