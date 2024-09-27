import {useAuthStore} from '~/store/authStore' 



export default defineNuxtRouteMiddleware ((to, from) => {
    const store = useAuthStore()
    const auth = store.getIsLoginSuccessful
    const permissions = store.getPermissions
    console.log(permissions)
    console.log(auth)

    if (to.path==="/tasks") {
        if (!permissions.includes("create-tasks")) {
            alert("Não foi possível acessar a página.")
            return navigateTo('/access-denied')
        }
        return ;
    }

    if (to.path==='/') {
        console.log("teste1")
        return ;
    }

    if (from.path !== '/' && to.path!=='/' && !store.isLoginSuccessful) {
        return navigateTo('/')
    }

    
})