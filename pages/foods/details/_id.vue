<template>
    <div>
        <h2>hello</h2>
        <div>{{ id }}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import FoodImage from '@/components/FoodImage.vue'

import ElementNameMixin from '@/mixins/ElementNameMixin.vue'

export default {
    components: {
        FoodImage
    },
    mixins: [ElementNameMixin],
    data(){
        return {
            id: this.$route.params.id,
            foods:[]
        }
    },
    async mounted() {
        await this.loadFoods()
    },
    methods: {
        async loadFoods() {
            const ref = this.$store.getters['foods/getFoodsRef']
            const foods = await ref.get()
            this.foods = []
            foods.forEach(doc => {
                console.log(doc.data())
                console.log(doc.id)
                const obj = doc.data()
                obj['id'] = doc.id
                this.foods.push(obj)                 
            })  
        }
    }
}
</script>