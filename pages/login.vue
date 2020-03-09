<template>
    <div>
        <nuxt-link to="/foods">foods</nuxt-link>
        <div>
            <p>e-mail:<input v-model="email"/></p>
            <p>password:<input v-model="password"/></p>
        </div>
        <button @click="login">login</button>
        <button @click="logout">logout</button>
    </div>
</template>

<script>
import { firestoreAction } from 'vuexfire'
import firebase from '@/plugins/firebase'

export default {
    data: {
        email: '',
        password: ''
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    // ...
                    console.log(errorMessage)
                })
        },
        logout() {
            firebase
            .auth()
            .signOut()
            .then(()=>{
                console.log("ログアウトしました")
            })
            .catch( (error)=>{
                console.log(`ログアウト時にエラーが発生しました (${error})`)
            })
        }
     }
}
</script>