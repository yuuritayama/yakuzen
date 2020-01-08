<template>
    <div>
        <h2>Hello Editer!</h2>
        <nuxt-link to="/list">Go to List</nuxt-link>
        <div>
            食品名:<input v-model='name'/>/種類:<input v-model='category'/>
        </div>
        <div>
            <div>五味</div>
            <div>
                <template v-for='(val, key) in fiveFlavorsMap'>
                    <input :id='key' :key='input-key' v-model='fiveFlavors[key]' type='checkbox'>
                    <label :for='key' :key='label-key'>{{ val }}</label>
                </template>
            </div>
            <div>五性</div>
            <div>
                <template v-for='(val, key) in fiveNatureMap'>
                    <input :id='key' :key='input-key' v-model='fiveNature[key]' type='checkbox'>
                    <label :for='key' :key='label-key'>{{ val }}</label>
                </template>
            </div>
            <div>体質</div>
            <div>
                <template v-for='(val, key) in constitutionMap'>
                    <input :id='key' :key='input-key' v-model='constitution[key]' type='checkbox'>
                    <label :for='key' :key='label-key'>{{ val }}</label>
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
            <button @click='addFoods'> Add Foods </button>
        </div>
        <div>{{files}}</div>
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
            foods:[],
            name: '',
            category: '',
            fiveFlavors: {},
            fiveNature: {},
            constitution: {},
            files: [],
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
                cold: '冷製',
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
        async addFoods() {
            console.log(this.name, this.category)
            const ref = this.$store.getters['foods/getFoodsRef']
            const food = ref.doc()
            console.log(food.id)
            await food.set({
                name: this.name, 
                category: this.category,
                fiveFlavors: this.fiveFlavors,
                fiveNature: this.fiveNature,
                constitution: this.constitution,
                files: this.files
            })
            //update view
            this.loadFoods()
        },
        async onFileSelected(e) {
            console.log(e)
            e.preventDefault()
            const files = e.target.files
            console.log(files)

            this.files.length = 0
            const storageRef = firebase.storage().ref()
            for(let file of files) {
                console.log(file)
                const filename = `foods/${file.name}`
                const fileRef = storageRef.child(filename)
                await fileRef.put(file)
                this.files.push(filename)
                console.log(await fileRef.getDownloadURL())
            }
        },
        onAddAmazonLink() {
            if(this.amazonLink.trim().length > 0) {
                this.files.push(this.amazonLink.trim())
            }
        }
    }
}
</script>