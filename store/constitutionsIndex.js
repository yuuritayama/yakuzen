import { firestoreAction } from 'vuexfire'
import firebase from '@/plugins/firebase'

const db = firebase.firestore()
const constitutionsIndex = db.collection('constitutions_index')

export const state = () => ({
    constitutionsIndex: []
})

export const getters = {
    getConstitutionsIndexRef: state => constitutionsIndex,
    constitutionsIndex: state => state.constitutionsIndex
}

export const actions = {
    setConstitutionsIndexRef: firestoreAction(({ bindFirestoreRef }, payload) => {
        bindFirestoreRef('constitutions_index', constitutionsIndex)
    })
}