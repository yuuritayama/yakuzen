<template>
    <div>
        <Header />
        <nuxt-link to="/foods/list">List</nuxt-link>
        <h2>中医学・アーユルヴェーダ食材効能一覧</h2>
        <input v-model="searchWord">
        <button @click='search(searchWord)'>検索</button>
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
                <tr v-for='(food,idx) in filteredFoods' :key='idx'>
                    <td>
                        <span class='list-block' v-for='src in food.files' :key='`file-${src}`'>
                            <food-image :src='src'/>
                        </span>
                    </td>
                    <td>
                        <nuxt-link :to='`/foods/${food.id}`'>
                            {{ food.name }}
                        </nuxt-link>
                    </td>
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
                <tr><td colspan='11'>
                    <button @click='loadMore'>もっと見る</button>
                </td></tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import FoodImage from '@/components/FoodImage.vue'
import Header from '@/components/Header.vue'

import ElementNameMixin from '@/mixins/ElementNameMixin.vue'
export default {
    components: {
        FoodImage,
        Header
    },
    mixins: [ElementNameMixin],
    data(){
        return {
            //id: this.$route.params.id,
            foods:[],
            searchWord: '',
            limit: 5
        }
    },
    computed:{
        filteredFoods() {
            // return this.foods.filter(food => {
            //     return food.name.indexOf(this.searchWord) >= 0
            // })
            return this.foods
        }
    },
    async mounted() {
        await this.loadFoods(this.limit, undefined)
    },
    methods: {
        async loadFoods(limit=10, startAfter=undefined, q) {
            if(startAfter === undefined) {
                this.foods = []
            } 
            const ref = this.$store.getters['foods/getFoodsRef']
            let query = ref
                    .orderBy('name', 'asc')
                    .limit(limit)
            if(q !== undefined) {
                query = query.startAt(q)
            }
            if(startAfter !== undefined) {
                query = query.startAfter(startAfter)
            }
            const foods = await query.get()
            foods.forEach(doc => {
                console.log(doc.data())
                console.log(doc.id)
                const obj = doc.data()
                obj['id'] = doc.id
                this.foods.push(obj)                 
            })  
        },
        async loadMore() {
            await this.loadFoods(this.limit, this.foods[this.foods.length - 1].name)    
        },
        async search(searchWord) {
            await this.loadFoods(this.limit, undefined, searchWord)
        }
    }
}
</script>

<style scoped>
.list-block {
    display: inline-block;
}

.list-block /deep/ img {
    max-width: 150px;
}
</style>