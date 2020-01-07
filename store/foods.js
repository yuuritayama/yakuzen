import { firestoreAction } from 'vuexfire'
import firebase from '@/plugins/firebase'

const db = firebase.firestore()
const foods = db.collection('foods')

export const state = () => ({
    foods: []
})

export const getters = {
    getFoodsRef: state => foods,
    foods: state => state.foods
}

export const actions = {
    setFoodsRef: firestoreAction(({ bindFirestoreRef }, payload) => {
        bindFirestoreRef('foods', foods)
    })
}