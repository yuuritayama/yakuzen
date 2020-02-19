<template>
    <div class="topParentContainer">
        <Header />
        <ul>
            <li><nuxt-link to="/foods">食材効能一覧</nuxt-link></li>
            <li><nuxt-link to="/constitutionsChecker">体質チェッカー</nuxt-link></li>
            <li><nuxt-link to="/soup">薬膳スープジェネレーター</nuxt-link></li>
        </ul>
        <span><strong>このサイトについて</strong></span>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
.topParentContainer {
    color: #302833;
    background-color: #f8f4e6;
}
</style>