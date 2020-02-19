<template>
    <div>
        <Header />
        <div class="parentContainer">
            <h2>体質チェッカー</h2>
            <div class="checkContainer">
                <h3>気虚</h3>
                <ul>
                    <li>
                        <label for="qd1">疲れやすい、倦怠感や無力感がある</label>
                        <input type="checkbox" id="qd1" value="Qd1" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd2">全身や手のひらに汗をかきやすい</label>
                        <input type="checkbox" id="qd2" value="Qd2" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd3">風邪をひきやすい</label>
                        <input type="checkbox" id="qd3" value="Qd3" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd4">下痢をしやすい</label>
                        <input type="checkbox" id="qd4" value="Qd4" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd5">顔色が白っぽい</label>
                        <input type="checkbox" id="qd5" value="Qd5" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd6">手足が冷えやすい</label>
                        <input type="checkbox" id="qd6" value="Qd6" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd7">ふわふわ感やめまいがよくある</label>
                        <input type="checkbox" id="qd7" value="Qd7" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd8">朝が苦手</label>
                        <input type="checkbox" id="qd8" value="Qd8" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd9">疲れると体調が悪くなり、休息をとるとよくなる</label>
                        <input type="checkbox" id="qd9" value="Qd9" v-model="checkedQiDeficiency">
                    </li>
                    <li>
                        <label for="qd10">舌の色が淡い</label>
                        <input type="checkbox" id="qd10" value="Qd10" v-model="checkedQiDeficiency">
                    </li>
                </ul>
                気虚 {{checkedQiDeficiency.length}} 点
            </div>
            <div class="checkContainer">
                <h3>気滞</h3>
                <ul>
                    <li>
                        <label for="qs1">~~~~~~</label>
                        <input type="checkbox" id="qs1" value="Qs1" v-model="checkedQiStagnation">
                    </li>
                    <li>
                        <label for="qs2">~~~~~~</label>
                        <input type="checkbox" id="qs2" value="Qs2" v-model="checkedQiStagnation">
                    </li>
                    <li>
                        <label for="qs3">~~~~~~</label>
                        <input type="checkbox" id="qs3" value="Qs3" v-model="checkedQiStagnation">
                    </li>
                </ul>
                気滞 {{checkedQiStagnation.length}} 点
            </div>
            <div class="checkContainer">
                <h3>血虚</h3>
                <ul>
                    <li>
                        <label for="bd1">~~~</label>
                        <input type="checkbox" id="bd1" value="Bd1" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd2">~~~</label>
                        <input type="checkbox" id="bd2" value="Bd2" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd3">~~~</label>
                        <input type="checkbox" id="bd3" value="Bd3" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd4">~~~</label>
                        <input type="checkbox" id="bd4" value="Bd4" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd5">~~~</label>
                        <input type="checkbox" id="bd5" value="Bd5" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd6">^~~~</label>
                        <input type="checkbox" id="bd6" value="Bd6" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd7">~~</label>
                        <input type="checkbox" id="bd7" value="Bd7" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd8">~~</label>
                        <input type="checkbox" id="bd8" value="Bd8" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd9">~~</label>
                        <input type="checkbox" id="bd9" value="Bd9" v-model="checkedBloodDeficiency">
                    </li>
                    <li>
                        <label for="bd10">~~</label>
                        <input type="checkbox" id="bd10" value="Bd10" v-model="checkedBloodDeficiency">
                    </li>
                </ul>
                血虚 {{checkedBloodDeficiency.length}} 点
            </div>
            <div class="checkContainer">
                <h3>瘀血</h3>
                <ul>
                    <li>
                        <label for="bs1">~~~~~~</label>
                        <input type="checkbox" id="bs1" value="Bs1" v-model="checkedBloodStasis">
                    </li>
                    <li>
                        <label for="bs2">~~~~~~</label>
                        <input type="checkbox" id="bs2" value="Bs2" v-model="checkedBloodStasis">
                    </li>
                    <li>
                        <label for="bs3">~~~~~~</label>
                        <input type="checkbox" id="bs3" value="Bs3" v-model="checkedBloodStasis">
                    </li>
                </ul>
                瘀血 {{checkedBloodStasis.length}} 点
            </div>
            <div class="checkContainer">
                <h3>水滞</h3>
                <ul>
                    <li>
                        <label for="fr1">~~~~~~</label>
                        <input type="checkbox" id="fr1" value="Fr1" v-model="checkedFluidRetention">
                    </li>
                    <li>
                        <label for="fr2">~~~~~~</label>
                        <input type="checkbox" id="fr2" value="Fr2" v-model="checkedFluidRetention">
                    </li>
                    <li>
                        <label for="fr3">~~~~~~</label>
                        <input type="checkbox" id="fr3" value="Fr3" v-model="checkedFluidRetention">
                    </li>
                </ul>
                水滞 {{checkedFluidRetention.length}} 点
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    components: {
        Header
    },
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

.parentContainer{
    text-align: center;
}

.checkContainer {
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    width: 80%;
    border: solid #5B6DCD 5px;
    padding: 5px;
}
</style>