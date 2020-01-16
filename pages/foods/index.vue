<template>
    <div>
        <h2>Hello Foods!</h2>
        <nuxt-link to="/foods/edit">Go to Editer</nuxt-link>
        <hr>
        <ul>
            <li v-for='(food,idx) in foods' :key='idx'>
                <span v-for='file in food.files' :key='`file-${file}`'>
                    <template v-if='file.indexOf("foods/") >= 0'>
                        <cloud-storage-image :filePath='file'/>
                    </template>
                    <span v-else v-html='file'>
                    </span>
                </span>
                <span>{{ food.id }} : {{ food.name }} {{ food.category }}　{{ food.fiveFlavors }}　{{ food.fiveNature }} {{ food.constitution }}</span>
                <nuxt-link :to='`/foods/edit/${food.id}`'><button> Edit </button></nuxt-link>
                <button @click='deleteFoods(food)'> Delete </button>
            </li>
        </ul>
    </div>
    

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import CloudStorageImage from '@/components/CloudStorageImage.vue'
export default {
    components: {
        CloudStorageImage
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