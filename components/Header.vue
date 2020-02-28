<template>
    <div class="header-parent-container">
        <h1 class="title"><nuxt-link to="/">ゆるゆる薬膳</nuxt-link></h1>
        <div class="header-nav">
            <ul>
                <li class="nav-menu"><nuxt-link to="">このサイトについて</nuxt-link></li>
                <li class="nav-menu"><nuxt-link to="/foods">食材効能一覧</nuxt-link></li>
                <li class="nav-menu"><nuxt-link to="/constitutionsChecker">体質チェッカー</nuxt-link></li>
                <li class="nav-menu"><nuxt-link to="/soup">薬膳スープジェネレーター</nuxt-link></li>
            </ul>
        </div>
        <div id="nav-drawer">
            <input id="nav-input" type="checkbox" class="nav-unshown">
            <label id="nav-open" for="nav-input"><span></span></label>
            <label class="nav-unshown" id="nav-close" for="nav-input"></label>
            <div id="nav-content">
                <ul>
                    <li>このサイトについて</li>
                    <li><nuxt-link to="/foods">食材効能一覧</nuxt-link></li>
                    <li><nuxt-link to="/constitutionsChecker">体質チェッカー</nuxt-link></li>
                    <li><nuxt-link to="/soup">薬膳スープジェネレーター</nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">

a {
    text-decoration: none;
    color: #302833;
    list-style: none;
}

ul {
    display: inline;
    li {
        margin:5px;
    }
}

.header-parent-container  {
    display: flex;
    background-color: #b9d08b;
}

.title {
    font: {
        size:20px;
        color: #f8f4e6;
    }
    display: inline;
    text-decoration: none;
}

.header-nav {
    margin-left: auto;
}

.nav-menu {
    display: inline;
}


/* ハンバーガーメニュー */
#nav-drawer {
  position: relative;
  margin-left: auto;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display:none;
}

/*アイコンのスペース*/
#nav-open {
  display: inline-block;
  width: 30px;
  height: 22px;
  vertical-align: middle;
}

/*ハンバーガーアイコンをCSSだけで表現*/
#nav-open span, #nav-open span:before, #nav-open span:after {
  position: absolute;
  height: 3px;/*線の太さ*/
  width: 25px;/*長さ*/
  border-radius: 3px;
  background: #f8f4e6;
  display: block;
  content: '';
  cursor: pointer;
}
#nav-open span:before {
  bottom: -8px;
}
#nav-open span:after {
  bottom: -16px;
}

/*閉じる用の薄黒カバー*/
#nav-close {
  display: none;/*はじめは隠しておく*/
  position: fixed;
  z-index: 99;
  top: 0;/*全体に広がるように*/
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: .3s ease-in-out;
}

/*中身*/
#nav-content {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;/*最前面に*/
  width: 90%;/*右側に隙間を作る（閉じるカバーを表示）*/
  max-width: 330px;/*最大幅（調整してください）*/
  height: 100%;
  background: #b9d08b;/*背景色*/
  transition: .3s ease-in-out;/*滑らかに表示*/
  -webkit-transform: translateX(-105%);
  transform: translateX(-105%);/*左に隠しておく*/
}

/*チェックが入ったらもろもろ表示*/
#nav-input:checked ~ #nav-close {
  display: block;/*カバーを表示*/
  opacity: .5;
}

#nav-input:checked ~ #nav-content {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);/*中身を表示（右へスライド）*/
  box-shadow: 6px 0 25px rgba(0,0,0,.15);
}

// responsibe
@media screen and (min-width:550px) { /*480に戻す*/
  #nav-open {
    display:none;
  }
}

@media screen and (max-width:550px) { /*480に戻す*/
  .header-nav {
    display:none;
  }
}
</style>
