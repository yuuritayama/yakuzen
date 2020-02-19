
<script>
export default {
    computed: {
        categoryMap() {
            return {
                vegetable: '野菜',
                fluit: '果物',
                protein: '肉・魚介',
                dryFood: '乾物',
                spice: 'スパイス',
                herb: 'ハーブ',
                sesoning: '調味料'
            }
        },
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
        constitutionsMap() {
            return {
                qiDeficiency: '気虚',
                qiStagnation: '気滞',
                bloodDeficiency: '血虚',
                bloodStasis: '瘀血',
                fluidRetention: '水滞'
            }
        },
        effectToDoshaMap() {
            return {
                vPlus: 'V+',
                vMinus: 'V-',
                pPlus: 'P+',
                pMinus: 'P-',
                kPlus: 'K+',
                kMinus: 'K-',
            }
        },
        gunaMap() {
            return {
                heavy: '重性',
                light: '軽性',
                cold: '冷性',
                hot: '熱性',
                oily: '油性',
                dry: '乾燥性',
                slow: '鈍性',
                sharp: '鋭性',
                stable: '静性',
                moving: '動性',
                soft: '軟性',
                hard: '硬性',
                nonSlimy: '濁性',
                slimy: '純性',
                smooth: '滑性',
                rough: '荒性',
                subtle: '微細性',
                gross: '粗性',
                solid: '固性',
                liquid: '液性'
            }
        },
        lasaMap() {
            return {
                madhura: '甘味（マドゥラ）',
                amla: '酸味（アムラ）',
                lavana: '塩味（ラヴァナ）',
                katu: '辛味（カトゥ）',
                tikta: '苦味（テクタ）',
                kashaya: '渋味（カシャーヤ）'
            }
        },
        viryaMap() {
            return {
                cold: '冷性',
                hot: '熱性'
            }
        },
        vipakaMap() {
            return {
                madhura: '甘味（マドゥラ）',
                amla: '酸味（アムラ）',
                katu: '辛味（カトゥ）'
            }
        }
    },
    methods: {
        toMap(obj){
            return Object.keys(obj).reduce((r, c) => {
                r[c] = false
                return r
            }, {})
        },
    }
}
</script>