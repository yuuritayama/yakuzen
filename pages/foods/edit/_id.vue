<template>
    <div>
        <h2>Hello Editer!</h2>
        <nuxt-link to="/foods">Go to List</nuxt-link>
        <div>
            食品名:<input v-model='food.name'/>/種類:<input v-model='food.category'/>
        </div>
        <div>
            <div>五味</div>
            <div>
                <template v-for='(val, key) in food.fiveFlavors'>
                    <input :id='key' :key='`input-${key}`' v-model='food.fiveFlavors[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ fiveFlavorsMap[key] }}</label>
                </template>
            </div>
            <div>五性</div>
            <div>
                <template v-for='(val, key) in food.fiveNature'>
                    <input :id='key' :key='`input-${key}`' v-model='food.fiveNature[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ fiveNatureMap[key] }}</label>
                </template>
            </div>
            <div>体質</div>
            <div>
                <template v-for='(val, key) in food.constitution'>
                    <input :id='key' :key='`input-${key}`' v-model='food.constitution[key]' type='checkbox'>
                    <label :for='key' :key='`label-${key}`'>{{ constitutionMap[key] }}</label>
                </template>
            </div>
        </div>
        <div>
            <input type="file" multiple="multiple" @change='onFileSelected'>
            <input type="reset">
        </div>
        <div>
            <textarea cols='60' rows='5' v-model='amazonLink'></textarea>
            <button @click='onAddAmazonLink'> Add </button>
        </div>
        <div>
            <button @click='addFood'> Add Foods </button>
        </div>
        <div>{{food.files}}</div>
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
            food: {},
            amazonLink:''
        }
    },
    computed: {
        fiveFlavorsMap() {
            return {
                bitter: '苦味',
                salty: '鹹味',
                sour: '酸味',
                spicy: '辛味',
                sweet: '甘味'
            }
        },
        fiveNatureMap() {
            return {
                veryCold: '寒性',
                cold: '冷性',
                nomal: '平性',
                hot: '温性',
                veryHot: '熱性'
            }
        },
        constitutionMap() {
            return {
                qiDeficiency: '気虚',
                qiStagnation: '気滞',
                bloodDeficiency: '血虚',
                bloodStasis: '瘀血',
                fluidRetention: '水滞'
            }
        }
    },
    async mounted() {
        await this.loadFood(this.$route.params.id)
    },
    methods: {
        toMap(obj){
            return Object.keys(obj).reduce((r, c) => {
                r[c] = false
                return r
            }, {})
        },
        async loadFood(id) {
            console.log(this.name, this.category)
            const ref = this.$store.getters['foods/getFoodsRef']
            const foodRef = id ? await ref.doc(id).get() : {exists: false}
            if (foodRef.exists) {
                console.log(foodRef.data())
                this.food = foodRef.data()
            } else {
                this.food = {
                    name: '', 
                    category: '',
                    fiveFlavors: this.toMap(this.fiveFlavorsMap),
                    fiveNature: this.toMap(this.fiveNatureMap),
                    constitution: this.toMap(this.constitutionMap),
                    files: []
                }
            }
        },
        async addFood() {
            console.log(this.name, this.category)
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