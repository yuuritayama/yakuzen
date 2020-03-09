<template>
    <div class="hm-global">
        <div class="hm-container">
            <h2>
                <nuxt-link to="">食材効能一覧</nuxt-link>
            </h2>
            <div class="hm-discription">＜＜準備中＞＞</div>
        </div>
        <div class="hm-container">
            <h2>
                <nuxt-link to="/constitutionsChecker">体質チェッカー</nuxt-link>
            </h2>
            <div class="hm-discription">あなたの中医学的体質を診断します。</div>
        </div>
        <div class="hm-container">
            <h2>
                <nuxt-link to="">薬膳スープジェネレーター</nuxt-link>
            </h2>
            <div class="hm-discription">＜＜準備中＞＞</div>
        </div>
    </div>
</template>

<style scoped>
.hm-global {
    margin: 20px 100px;
}

.hm-container {
    display: flex;
    flex-direction: row;
    margin: 10px;
}

.hm-container h2 {
    font-size: 20px;
    width: 300px;
    height: 200px;
    display: flex;
	align-items: center;
	justify-content: center;
    background-color: #c8d8a8;
}

.hm-container a {
    color: #302833;
    text-decoration: none;
}

.hm-container a:hover {
    color: #caa8d8;
}

.hm-discription {
    border: solid 3px #c8d8a8;
    width: 600px;
    height: 200px;
    display: flex;
	align-items: center;
	justify-content: center;
}
</style>

