<template>
    <div class="topParentContainer">
        <Header />
        <HomeMenu />
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import HomeMenu from '@/components/HomeMenu.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Header,
        HomeMenu,
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
    background-color: #fffbf7;
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

.color {
    color: #f8f4e6;
    color: #c8d8a8;
    color: #fffbf7;
    color: #302833;
    color: #b9d08b;
    color: #caa8d8;
}
</style>