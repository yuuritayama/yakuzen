<template>
    <div>
        <nuxt-link to="/">Top</nuxt-link>
        <h2>Soup Generater</h2>
        <div class="displaySection">
            たべもの
        </div>
        <div class="chooseSection">
            <div class="foodChooseSection">
                <span>ベースを選ぶ</span>
                <button>鶏</button>
                <button>豚</button>
                <button>えび</button>
            </div>
            <div class="constitutionsChooseSection">
                <span>体質を選ぶ</span>
                <button>気虚</button>
                <button>気滞</button>
                <button>血虚</button>
                <button>瘀血</button>
                <button>水滞</button>
            </div>
        </div>
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
    data() {
        return {
            foods: []
        }
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