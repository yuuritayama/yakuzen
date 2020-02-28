import firebase from 'firebase'

const serviceAccount = require('@/config/firebase.json')
firebase.initializeApp(serviceAccount)

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        // ...
    }
    console.log(user)
})

export default firebase