<template>
    <div>
        <Header />
        <div class="soup-parent-container">
            <h2>Soup Generater</h2>
            <div class="display-section">
                <div class="soup-base">
                    <div class="soup-img" v-if="soupBase === 'chicken'">
                        <nuxt-link to="/foods/k0jSa31b06kwR1EZJ1lq">
                            <img src="@/assets/image/chicken.jpg" />
                            <p>鶏</p>
                        </nuxt-link>
                    </div>
                    <div class="soup-img" v-else-if="soupBase === 'pork'">
                        <nuxt-link to="/foods/p7KnDxFsivu46yLExSTM">
                            <img src="@/assets/image/pork.jpg" />
                            <p>豚</p>
                        </nuxt-link>
                    </div>
                    <div class="soup-img" v-else-if="soupBase === 'shrimp'">
                        <nuxt-link to="/foods/LiZt1KVT2Ybneppo7dWn">
                            <img src="@/assets/image/shrimp.jpg" />
                            <p>えび</p>
                        </nuxt-link>
                    </div>
                    <div class="soup-img" v-else>
                        <img  src="@/assets/image/noImg.png" />
                        <p>ベースを選択</p>
                    </div>
                </div>
                <div class="soup-base">
                    <!-- <div v-for='constitution in constitutionsIndex' :key="constitution.id">
                        <nuxt-link to="" v-if='constitution.data'> 
                            <span class="soup-img" v-for='src in constitution.data.files' :key='`file-${src}`'>
                                <food-image :src='src'/>
                            </span>
                            <p> {{ constitution.data.name }}</p>
                        </nuxt-link>
                    </div> -->
                </div>
            </div>
            <div>
                <div>
                    <!-- test: <span>{{ randomConstitutionsIndex() }}</span> -->
                </div>
            </div>
            <div class="choose-section">
                <div class="food-choose-section">
                    <span>ベースを選ぶ</span>
                    <a class="btn" @click='clickedBaseFood("chicken")'>鶏</a>
                    <a class="btn" @click='clickedBaseFood("pork")'>豚</a>
                    <a class="btn" @click='clickedBaseFood("shrimp")'>えび</a>
                </div>
                <div class="constitutions-choose-section">
                    <span>体質を選ぶ</span>
                    <a class="btn" @click='clickedConstitution("qiDeficiency")'>気虚</a>
                    <a class="btn" @click='clickedConstitution("qiStagnation")'>気滞</a>
                    <a class="btn" @click='clickedConstitution("bloodDeficiency")'>血虚</a>
                    <a class="btn" @click='clickedConstitution("bloodStasis")'>瘀血</a>
                    <a class="btn" @click='clickedConstitution("fluidRetention")'>水滞</a>
                </div>
            </div>
        </div>
        <button @click="test">test</button>
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
    data() {
        return {
            constitutionsIndex: [],
            soupBase: ''
        }
    },
    methods: {
        clickedBaseFood(baseFood){
            this.soupBase = baseFood
        },
        async clickedConstitution(constitution) {
            await this.loadConstitutionsIndex(constitution)
            await this.randomConstitutionsIndex()
        },
        async loadConstitutionsIndex(constitution) {
            const ref = this.$store.getters['constitutionsIndex/getConstitutionsIndexRef']
            const constitutionsIndex = 
                await ref
                    .doc(constitution)
                    .collection('_true')
                    .get()
            this.constitutionsIndex = []
            constitutionsIndex.forEach(async doc => {
                console.log(doc.data())
                console.log(doc.id)
                this.constitutionsIndex.push({
                    id: doc.id,
                    data: (await doc.data().foodRef.get()).data()
                })
            })
            console.log('load', this.constitutionsIndex)
        },
       //配列constitutionsIndexからランダムにnum個の要素を取り出す
        async randomConstitutionsIndex() {
            const selected = randomSelect(this.constitutionsIndex.slice(),2)
            randomSelect(this.constitutionsIndex, num => {
                let newArray = []
                while (newArray.length < num && this.constitutionsIndex.length > 0) {
                    // 配列からランダムな要素を選ぶ
                    const rnd = Math.floor(Math.random() * this.constitutionsIndex.length)
                    // 選んだ要素を別の配列に登録する
                    newArray.push(this.constitutionsIndex[rnd])
                    // もとの配列からは削除する
                    this.constitutionsIndex.splice(rnd, 1)
                }
                return newArray
            })
            console.log('random', selected)
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center
}
.soup-parent-container {
    background-color: #fffbf7;
    margin: 0 10%;
}
.soup-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.soup-img /deep/ img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

.display-section {
    margin: 50px;
}

.soup-base {
    display: inline-flex;
    margin: 20px;
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
</style>