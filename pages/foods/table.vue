<template>
    <div>
        <h2>Hello Table^^</h2>
        <nuxt-link to="/foods">Go to List</nuxt-link>
        <table border="1">
            <thead>
                 <tr>
                    <th>Image</th>
                    <th>食品名</th>
                    <th>種類</th>
                    <th>五味</th>
                    <th>五性</th>
                    <th>中医学的体質</th>
                    <th>ドーシャへの作用</th>
                    <th>性質（グナ）</th>
                    <th>味（ラサ）</th>
                    <th>薬力源（ヴィールヤ）</th>
                    <th>消化後の味（ヴィパーカ）</th>
                 </tr>
            </thead>
            <tbody>
                <tr v-for='(food,idx) in foods' :key='idx'>
                    <td>
                        <span class='list-block' v-for='src in food.files' :key='`file-${src}`'>
                            <food-image :src='src'/>
                        </span>
                    </td>
                    <td><nuxt-link to="/foods/details">{{ food.name }}</nuxt-link></td>
                    <td>
                        <template v-for='(val, key) in food.category'>
                            <div v-if='val'>
                                {{ categoryMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.fiveFlavors'>
                            <div v-if='val'>
                                {{ fiveFlavorsMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val,key) in food.fiveNature'>
                            <div v-if='val'>
                                {{ fiveNatureMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val,key) in food.constitutions'>
                            <div v-if='val'>
                                {{ constitutionsMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.effectToDosha'>
                            <div v-if='val'>
                                {{ effectToDoshaMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.guna'>
                            <div v-if='val'>
                                {{ gunaMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.lasa'>
                            <div v-if='val'>
                                {{ lasaMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.virya'>
                            <div v-if='val'>
                                {{ viryaMap[key] }}
                            </div>
                        </template>
                    </td>
                    <td>
                        <template v-for='(val, key) in food.vipaka'>
                            <div v-if='val'>
                                {{ vipakaMap[key] }}
                            </div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <vue-good-table :columns="columns" :rows="rows"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import FoodImage from '@/components/FoodImage.vue'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

import ElementNameMixin from '@/mixins/ElementNameMixin.vue'
export default {
    components: {
        FoodImage,
        VueGoodTable
    },
    mixins: [ElementNameMixin],
    data(){
        return {
            foods:[],
            columns: [
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Age',
                    field: 'age',
                    type: 'number'
                },
                {
                    label: 'Created On',
                    field: 'createdAt',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM Do yy'
                },
                {
                    label: 'Percent',
                    field: 'score',
                    type: 'percentage'
                }
            ],
            rows: [
                { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
                { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 }
            ]
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

<style scoped>
.list-block {
    display: inline-block;
}

.list-block /deep/ img {
    max-width: 100px;
}
</style>