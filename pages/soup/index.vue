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
                        <p>ベースを選択してください</p>
                    </div>
                </div>
                <div class="soup-base">
                    <div v-for='constitution in constitutionsIndex' :key="constitution.id">
                        <!-- ↓リンク -->
                        <div>
                            {{ constitution }}
                        </div>
                        <nuxt-link to="" v-if='constitution.data'> 
                            <span class="soup-img" v-for='src in constitution.data.files' :key='`file-${src}`'>
                                <food-image :src='src'/>
                            </span>
                            <p> {{ constitution.data.name }}</p>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="choose-section">
                <div class="food-choose-section">
                    <span>ベースを選ぶ</span>
                    <button @click='clickedBaseFood("chicken")'>鶏</button>
                    <button @click='clickedBaseFood("pork")'>豚</button>
                    <button @click='clickedBaseFood("shrimp")'>えび</button>
                </div>
                <div class="constitutions-choose-section">
                    <span>体質を選ぶ</span>
                    <button @click='clickedConstitutionsIndex("qiDeficiency")'>気虚</button>
                    <button @click='clickedConstitutionsIndex("qiStagnation")'>気滞</button>
                    <button @click='clickedConstitutionsIndex("bloodDeficiency")'>血虚</button>
                    <button @click='clickedConstitutionsIndex("bloodStasis")'>瘀血</button>
                    <button @click='clickedConstitutionsIndex("fluidRetention")'>水滞</button>
                </div>
            </div>
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
        async clickedConstitutionsIndex(constitution) {
            const ref = this.$store.getters['constitutionsIndex/getConstitutionsIndexRef']
            const constitutionsIndex = 
                await ref
                    .doc(constitution)
                    .collection('_true')
                    .get()
            this.constitutionsIndex = []
            console.log('ci', constitutionsIndex)
            constitutionsIndex.forEach(async doc => {
                console.log(doc.data())
                console.log(doc.id)
                this.constitutionsIndex.push({
                    id: doc.id,
                    data: (await doc.data().foodRef.get()).data()
                })
            })
            console.log(this.constitutionsIndex)
        }
    }
}
</script>

<style scoped>
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

.soup-parent-container {
    background-color: #f9f9f7;
}

.display-section {
    margin: 50px;
}

.soup-base {
    display: inline-flex;
    margin: 20px;
}
</style>