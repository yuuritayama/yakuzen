<template>
    <div>
        <h2>Hello Foods!</h2>
        <div>
            食品名:<input v-model='name'/>/種類:<input v-model='category'/>/五味:<input v-model='fiveFlavors'/>/五性:<input v-model='五性'/>/体質:<input v-model='constitution'/>
            <button @click='addFoods'> Add Foods </button>
        </div>
        <ul>
            <li v-for='(food,idx) in foods' :key='idx'>
                <span>{{ food.id }} : {{ food.name }} {{ food.category }}　{{ food.fiveFlavors }}　{{ food.五性 }} {{ food.constitution }}</span>
                <button @click='deleteFoods(food)'> Delete </button>
            </li>
        </ul>
    </div>
    

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            foods:[],
            name: undefined,
            category: undefined,
            foveFlavors: undefined,
            五性: undefined,
            constitution: undefined
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
        async addFoods() {
            console.log(this.name, this.category)
            const ref = this.$store.getters['foods/getFoodsRef']
            const food = ref.doc()
            console.log(food.id)
            await food.set({
                name: this.name, 
                category: this.category,
                fiveFlavors: this.fiveFlavors,
                五性: this.五性,
                constitution: this.constitution
            })
            //update view
            this.loadFoods()
        },
        async deleteFoods(food) {
            console.log(food)
            const ref = this.$store.getters['foods/getFoodsRef']
            const foodRef = ref.doc(food.id)
            console.log(foodRef)
            foodRef.delete()
            //update view
            this.loadFoods()
        }
    }
}
</script>