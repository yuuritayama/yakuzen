<template>
    <div>
        <Header />
        <nuxt-link to="/foods/list">List</nuxt-link>
        <div class="foods-parent-container">
            <h2>中医学食材効能一覧</h2>
            <div class="foods-search">
                <input v-model="searchWord">
                <a class="btn" @click='search(searchWord)'>検索</a>
            </div>
            <table class="foods-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>食品名</th>
                        <th>種類</th>
                        <th>五味</th>
                        <th>五性</th>
                        <th>体質</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(food,idx) in filteredFoods' :key='idx'>
                        <td>
                            <span class='list-block' v-for='src in food.files' :key='`file-${src}`'>
                                <food-image :src='src'/>
                            </span>
                        </td>
                        <td data-label="食品名">
                            <nuxt-link :to='`/foods/${food.id}`'>
                                {{ food.name }}
                            </nuxt-link>
                        </td>
                        <td data-label="種類">
                            <template v-for='(val, key) in food.category'>
                                <div v-if='val'>
                                    {{ categoryMap[key] }}
                                </div>
                            </template>
                        </td>
                        <td data-label="五味">
                            <template v-for='(val, key) in food.fiveFlavors'>
                                <div v-if='val'>
                                    {{ fiveFlavorsMap[key] }}
                                </div>
                            </template>
                        </td>
                        <td data-label="五性">
                            <template v-for='(val,key) in food.fiveNature'>
                                <div v-if='val'>
                                    {{ fiveNatureMap[key] }}
                                </div>
                            </template>
                        </td>
                        <td data-label="体質">
                            <template v-for='(val,key) in food.constitutions'>
                                <div v-if='val'>
                                    {{ constitutionsMap[key] }}
                                </div>
                            </template>
                        </td>
                    </tr>
                    <tr><td colspan='11'>
                        <a class="btn" @click='loadMore'>もっと見る</a>
                    </td></tr>
                </tbody>
            </table>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import FoodImage from '@/components/FoodImage.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


import ElementNameMixin from '@/mixins/ElementNameMixin.vue'
export default {
    components: {
        FoodImage,
        Header,
        Footer
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

<style scoped lang="scss">
.foods-parent-container {
    color: #302833;
    background-color: #fffbf7;
    text-align: center;
    margin: 0 10%;
}

.foods-search{
    text-align: right;
}

.list-block {
    display: inline-block;
}

.list-block /deep/ img {
    max-width: 100px;
}

h2 {
    text-align: center;
}

a {
    color: #302833;
    text-decoration: none;
}

a:hover {
    color: #caa8d8;
}

input {
    border: solid 1px #caa8d8;
}

.btn {
    position: relative;
    display: inline-block;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #302833;
    background: #caa8d8;
    transition: .4s;
    }

.btn:hover {
    background: #302833;
    color: #f8f4e6;
}


/***　おしゃれテーブル4 マゼンダカラー 　***/
/* https://ganchan.info/archives/2811/2 */
.foods-table {
    width:100%;
    border-collapse: separate; 
    border: none;
    border-spacing: 0px 10px ;
}

.foods-table tbody td, 
.foods-table tfoot td {
    text-align: center;
}

/* 上部ヘッダー */
.foods-table thead th {
    color: #302833; 
    font-weight: bold;
    background:#c8d8a8;
}

/* 上部ヘッダーの丸み */
.foods-table thead th:nth-child(2) {
    border-radius: 10px 0 0 0;
}
.foods-table thead th:last-child  {
    border-radius: 0 10px  0 0;
}

.foods-table th,
.foods-table td {
 border: 0 none !important;
}

/* ヘッダーセル先頭・ボディ項目・フッター項目 */
.foods-table tbody th,
.foods-table tfoot th,
.foods-table thead th:first-child {
    background:none;
}

.foods-table td:first-child {
    background-color: #c8d8a8;
    width:200px;
}


/* ここからコピペ　https://b-risk.jp/blog/2018/07/table-css/ */
/* mobile */
@media screen and (max-width: 640px) {
    .foods-table {
        width: 80%;
    }
    .foods-table thead {
        display: none;
    }
    .foods-table tr {
        width: 100%;
    }
    .foods-table td {
        display: block;
        text-align: right;
        width: 100%;
    }
    .foods-table td:first-child {
        background: #c8d8a8;
        color: #f8f4e6;
        width: 100%;
        font-weight: bold;
        text-align: center;
    }
    .foods-table td:before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        margin-right: 10px;
    }
}

</style>