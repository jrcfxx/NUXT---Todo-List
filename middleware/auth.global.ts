import {useAuthStore} from '~/store/authStore' 



export default defineNuxtRouteMiddleware ((to, from) => {
    const store = useAuthStore()
    
    const permissions = store.getPermissions
    console.log(permissions)

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

    console.log(store)
    if (to.path!=='/' || !store.isLoginSuccessful) {
        return navigateTo('/')
    }

    
})