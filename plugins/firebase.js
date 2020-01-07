import firebase from 'firebase'

const serviceAccount = require('@/config/firebase.json')
firebase.initializeApp(serviceAccount)

export default firebase