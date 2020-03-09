<template>
    <div>
        <Header />
        <div class="cc-global">
            <h2>体質チェッカー</h2>
            <div class="cc-container">
                <h3>気虚</h3>
                <div class="cc-box" v-for="QiDeficiencyList in QiDeficiencyLists" :key="QiDeficiencyList.id">
                    <input type="checkbox" :id="QiDeficiencyList.id" :value="QiDeficiencyList.value" v-model="checkedQiDeficiency">
                    <label :for="QiDeficiencyList.id">{{ QiDeficiencyList.item }}</label>
                </div>
                <div class="cc-point">気虚： {{checkedQiDeficiency.length}} 点</div>
            </div>
            <div class="cc-container">
                <h3>気滞</h3>
                <div class="cc-box">
                    <input type="checkbox" id="qs1" value="Qs1" v-model="checkedQiStagnation">
                    <label for="qs1">~~~~~~</label>
                </div> 
                <div class="cc-point">気滞： {{checkedQiStagnation.length}} 点</div>
            </div>
            <div class="cc-container">
                <h3>血虚</h3>
                <div class="cc-box">
                    <input type="checkbox" id="bd1" value="Bd1" v-model="checkedBloodDeficiency">
                    <label for="bd1">~~~</label>
                </div>
                <div class="cc-point">血虚： {{checkedBloodDeficiency.length}} 点</div>
            </div>
            <div class="cc-container">
                <h3>瘀血</h3>
                <div class="cc-box">
                    <input type="checkbox" id="bs1" value="Bs1" v-model="checkedBloodStasis">
                    <label for="bs1">~~~~~~</label>
                </div>
                <div class="cc-point">瘀血： {{checkedBloodStasis.length}} 点</div>
            </div>
            <div class="cc-container">
                <h3>水滞</h3>
                <div class="cc-box">
                    <input type="checkbox" id="fr1" value="Fr1" v-model="checkedFluidRetention">
                    <label for="fr1">~~~~~~</label>
                </div>
                <div class="cc-point">水滞： {{checkedFluidRetention.length}} 点</div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ConstitutionsCheckMixin from '@/mixins/ConstitutionsCheckMixin.vue'

export default {
    components: {
        Header,
        Footer
    },
    mixins: [ConstitutionsCheckMixin],
    data() {
        return {
             checkedQiDeficiency: [],
             checkedQiStagnation: [],
             checkedBloodDeficiency: [],
             checkedBloodStasis: [],
             checkedFluidRetention: []
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.cc-global{
    border: solid 3px red;
    background-color: #fffbf7;
    margin: 0 10%;
}

.cc-container {
    border: solid 3px blue;
    display: inline-block;
    box-sizing: border-box;
    width: 80%;
    padding: 5px;
}

h3 {
    background-color: #c8d8a8;
}

.cc-box {
    border-bottom: solid 3px #f8f4e6;
    margin: 4px 20px;
}

.cc-point {
    background-color: #c8d8a8;
}
</style>