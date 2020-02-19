<template>
    <div>
        <h2>Hello Foods!</h2>
        <nuxt-link to="/foods/edit">Edit</nuxt-link>
        <nuxt-link to="/foods/">Foods</nuxt-link>
        <hr>
        <ul>
            <li v-for='(food,idx) in foods' :key='idx'>
                <span class='list-block' v-for='src in food.files' :key='`file-${src}`'>
                    <food-image :src='src'/>
                </span>
                <span>{{ food.id }} : {{ food.name }} {{ food.category }}　{{ food.fiveFlavors }}　{{ food.fiveNature }} {{ food.constitutions }} {{ food.effectToDosha }} {{ food.guna }}</span>
                <nuxt-link :to='`/foods/edit/${food.id}`'><button> Edit </button></nuxt-link>
                <button @click='deleteFoods(food)'> Delete </button>
            </li>
        </ul>
    </div>
    

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import FoodImage from '@/components/FoodImage.vue'

export default {
    components: {
        FoodImage
    },
    data() {
        return {
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
        },
        async deleteFoods(food) {
            console.log(food)
            const ref = this.$store.getters['foods/getFoodsRef']
            const foodRef = ref.doc(food.id)
            console.log(foodRef)
            await foodRef.delete()
            //update view
            await this.loadFoods()
        }
    }
}
</script>

<style scoped>
.list-block {
    display: inline-block;
}

.list-block /deep/ img {
    max-width: 100px;
}
</style>