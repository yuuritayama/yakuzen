<template>
    <div>
        <Header />
        <nuxt-link to="/foods/">Back</nuxt-link>
        <div class="food-parent-container">
            <h3>{{ food.name }}</h3>
            <span class='list-block' v-for='src in food.files' :key='`file-${src}`'>
                <food-image :src='src'/>
            </span>
            <div classs="container">
                <span>種類</span>
                <template v-for='(val, key) in food.category'>
                    <div class='box' v-bind:class='{active: val}'>
                        {{ categoryMap[key] }}
                    </div>
                </template>
            </div>
            <div classs="container">
                <span>五味</span>
                <template v-for='(val, key) in food.fiveFlavors'>
                    <div class='box' v-bind:class='{active: val}'>
                        {{ fiveFlavorsMap[key] }}
                    </div>
                </template>
            </div>
            <div classs="container">
                <span>五性</span>
                <template v-for='(val,key) in food.fiveNature'>
                    <div class='box' v-bind:class='{active: val}'>
                        {{ fiveNatureMap[key] }}
                    </div>
                </template>
            </div>
            <div classs="container">
                <span>体質</span>
                <template v-for='(val,key) in food.constitutions'>
                    <div class='box' v-bind:class='{active: val}'>
                        {{ constitutionsMap[key] }}
                    </div>
                </template>
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
            food: undefined
        }
    },
    async asyncData({route, store, redirect}) {
        const id = route.params.id
        const ref = store.getters['foods/getFoodsRef']
        const foodRef = id ? await ref.doc(id).get() : {exists: false}
        if (foodRef.exists) {
            return {
                food: foodRef.data()
            }
        } else {
            redirect('/foods')
        }
    }
}
</script>

<style scoped>
h3 {
    color: #302833;
    background-color: #c8d8a8;
}

a {
    text-decoration: none;
    color: #302833;
}

.food-parent-container {
    color: #302833;
    background-color: #fffbf7;
    text-align: center;
    margin: 0 10%;
}
.container {
    display: flex;
    flex-direction: column;
    border: solid;
}

.box {
    display: inline;
    border: solid;
    color: grey;
}

.active {
    color: #302833;
    background-color: #caa8d8;
}


.list-block {
    display: inline-block;
}

.list-block /deep/ img {
    width: 300px;
}
</style>