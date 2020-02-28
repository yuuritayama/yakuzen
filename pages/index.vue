<template>
    <div class="topParentContainer">
        <Header />
        <div class="menuContainer">
            <div>
                <img src="@/assets/image/top.jpg" />
            </div>
            <ul>
                <li class="menu"><span>このサイトについて</span></li>
                    <ul>
                        <li class="menuDiscription">discription</li>
                    </ul>
                <li class="menu"><nuxt-link to="/foods">食材効能一覧</nuxt-link></li>
                    <ul>
                        <li>discription</li>
                    </ul>
                <li class="menu"><nuxt-link to="/constitutionsChecker">体質チェッカー</nuxt-link></li>
                    <ul>
                        <li>discription</li>
                    </ul>
                <li class="menu"><nuxt-link to="/soup">薬膳スープジェネレーター</nuxt-link></li>
                    <ul>
                        <li>discription</li>
                    </ul>
            </ul>
        </div>
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

<style lang="scss" scoped>
img {
    width:800px;
}

a {
    text-decoration: none;
    color: #302833;
}

.topParentContainer {
    color: #302833;
    background-color: #f9f9f7;
}

.menuContainer {
    display: flex;
}

.menu {
    color: #302833;
    list-style: none;
    background-color: #c8d8a8;
    height: 150px;
    width: 300px;
}

.menuDisctipution {
    color: #302833
}

</style>