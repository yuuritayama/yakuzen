<template>
    <div>
        <nuxt-link to="/foods">foods</nuxt-link>
        <button @click="login">login</button>
        <button @click="logout">logout</button>
    </div>
</template>

<script>
import { firestoreAction } from 'vuexfire'
import firebase from '@/plugins/firebase'

export default {
    methods: {
        login() {
            const email = 'michi.chou69@gmail.com'
            const password = 'mametabi7746'
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    // ...
                    console.log(errorMessage)
                })
        },
        logout() {
            firebase.auth().signOut().then(()=>{
                console.log("ログアウトしました")
            })
            .catch( (error)=>{
                console.log(`ログアウト時にエラーが発生しました (${error})`)
            })
        }
     }
}
</script>