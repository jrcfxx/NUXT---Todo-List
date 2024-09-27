import {useAuthStore} from '~/store/authStore' 



export default defineNuxtRouteMiddleware ((to, from) => {
    const store = useAuthStore()
    const auth = store.getIsLoginSuccessful
    const permissions = store.getPermissions

    if (to.path==="/tasks") {
        if (!permissions.includes("create-tasks")) {
            return navigateTo('/access-denied')
        }
        return ;
    }

    if (to.path==='/') {
        return ;
    }

    if (from.path !== '/' && to.path!=='/' && !store.isLoginSuccessful) {
        
        return navigateTo('/')
    }

    
})