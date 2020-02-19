<template>
    <div>
        <h2>Hello Editer!</h2>
        <nuxt-link to="/foods/list">Go to List</nuxt-link>
        <div class="item">食品名:<input v-model='food.name'/></div>
        <div>
             <div class="item">種類</div>
            <div>
                <template v-for='(val, key) in food.category'>
                    <input :id='key' :key='`input-${key}`' v-model='food.category[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ categoryMap[key] }}</label>
                </template>
            </div>
            <div class="item">五味</div>
            <div>
                <template v-for='(val, key) in food.fiveFlavors'>
                    <input :id='key' :key='`input-${key}`' v-model='food.fiveFlavors[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ fiveFlavorsMap[key] }}</label>
                </template>
            </div>
            <div class="item">五性</div>
            <div>
                <template v-for='(val, key) in food.fiveNature'>
                    <input :id='key' :key='`input-${key}`' v-model='food.fiveNature[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ fiveNatureMap[key] }}</label>
                </template>
            </div>
            <div class="item">中医学的体質</div>
            <div>
                <template v-for='(val, key) in food.constitutions'>
                    <input :id='key' :key='`input-${key}`' v-model='food.constitutions[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ constitutionsMap[key] }}</label>
                </template>
            </div>
            <div class="item">ドーシャへの作用</div>
            <div>
                <template v-for='(val, key) in food.effectToDosha'>
                    <input :id='key' :key='`input-${key}`' v-model='food.effectToDosha[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ effectToDoshaMap[key] }}</label>
                </template>
            </div>
            <div class="item">グナ（性質）</div>
            <div>
                <template v-for='(val, key) in food.guna'>
                    <input :id='key' :key='`input-${key}`' v-model='food.guna[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ gunaMap[key] }}</label>
                </template>
            </div>
            <div class="item">ラサ（味）</div>
            <div>
                <template v-for='(val, key) in food.lasa'>
                    <input :id='key' :key='`input-${key}`' v-model='food.lasa[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ lasaMap[key] }}</label>
                </template>
            </div>
            <div class="item">ヴィールヤ（薬力源）</div>
            <div>
                <template v-for='(val, key) in food.virya'>
                    <input :id='key' :key='`input-${key}`' v-model='food.virya[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ viryaMap[key] }}</label>
                </template>
            </div>
            <div class="item">ヴィパーカ（消化後の味）</div>
            <div>
                <template v-for='(val, key) in food.vipaka'>
                    <input :id='key' :key='`input-${key}`' v-model='food.vipaka[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ vipakaMap[key] }}</label>
                </template>
            </div>
        </div>
        <div class="item">
            <input type="file" multiple="multiple" @change='onFileSelected'>
            <input type="reset">
        </div>
        <div class="item">
            <textarea cols='60' rows='5' v-model='amazonLink'></textarea>
            <button @click='onAddAmazonLink'> Add </button>
        </div>
        <div class="item">
            <button @click='addFood'> Add Foods </button>
        </div>
        <div>{{food.files}}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import CloudStorageImage from '@/components/CloudStorageImage.vue'
import ElementNameMixin from '@/mixins/ElementNameMixin.vue'
export default {
    components: {
        CloudStorageImage
    },
    mixins: [ElementNameMixin],
    data() {
        return {
            food: {},
            amazonLink:''
        }
    },
    async mounted() {
        await this.loadFood(this.$route.params.id)
    },
    methods: {
        async loadFood(id) {
            const ref = this.$store.getters['foods/getFoodsRef']
            const foodRef = id ? await ref.doc(id).get() : {exists: false}
            if (foodRef.exists) {
                console.log(foodRef.data())
                this.food = foodRef.data()
            } else {
                this.food = {
                    name: '', 
                    category: this.toMap(this.categoryMap),
                    fiveFlavors: this.toMap(this.fiveFlavorsMap),
                    fiveNature: this.toMap(this.fiveNatureMap),
                    constitutions: this.toMap(this.constitutionsMap),
                    effectToDosha: this.toMap(this.effectToDoshaMap),
                    guna: this.toMap(this.gunaMap),
                    lasa: this.toMap(this.lasaMap),
                    virya: this.toMap(this.viryaMap),
                    vipaka: this.toMap(this.vipakaMap),
                    files: []
                }
            }
        },
        async addFood() {
            const ref = this.$store.getters['foods/getFoodsRef']
            const foodRef = this.$route.params.id ? ref.doc(this.$route.params.id) : ref.doc()
            await foodRef.set(this.food)
            //update view
            await this.loadFood(foodRef.id)
            this.$router.replace({params: {id: foodRef.id}})
        },
        async onFileSelected(e) {
            console.log(e)
            e.preventDefault()
            const files = e.target.files
            console.log(files)

            const storageRef = firebase.storage().ref()
            for(let file of files) {
                console.log(file)
                const filename = `foods/${file.name}`
                const fileRef = storageRef.child(filename)
                await fileRef.put(file)
                this.food.files.push(filename)
                console.log(await fileRef.getDownloadURL())
            }
        },
        onAddAmazonLink() {
            if(this.amazonLink.trim().length > 0) {
                this.food.files.push(this.amazonLink.trim())
            }
        }
    }
}
</script>

<style scoped>
.item {
    font-size: 18px;
    margin: 10px 0 0 0;
}
</style>