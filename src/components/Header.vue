<script>
import notification from "@/assets/notification.png"
import profile from "@/assets/profile.png"
import logo from "@/assets/logo.png"
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    data() {
        return {
            img1: notification,
            img2: profile,
            logo: logo,
        }
    },
    setup() {
        const store = useStore();
        const isAuthenticated = computed(() => store.state.globalState.isAuthenticated);
        return {
        isAuthenticated
    };
    }
}
</script>

<template>
    <header>
        <router-link :to="{ name: 'Main' }"> <img :src="logo" className="logo"> </router-link>
        <nav>
            <router-link :to="{ name: 'Main' }">Главная</router-link>
            <router-link  :to="{ name: 'Dishes'}">Готовые блюда</router-link>
            <router-link :to="{ name: 'Vegetables' }">Продукты</router-link>
            <router-link :to="{ name: 'Recipes' }">Рецепты</router-link>
            <router-link :to="{ name: 'Basket' }">Корзина</router-link>
        </nav>
        <div className="left-images">
            <router-link :to="{ name: 'Notification' }" v-if="isAuthenticated"> <img :src="img1"></router-link>
           <div>
            <div className="imgRight"><router-link :to="{ name: 'Profile' }" v-if="isAuthenticated"> <img :src="img2"> </router-link> </div>
            <div className="rightText"><router-link :to="{ name: 'Login' }" v-if="!isAuthenticated">Войти</router-link></div>
           </div> 
        </div>
    </header>

</template>

<style scoped>
a
{
    color:#FCEDD8;
    font-size: 25px;
    text-decoration: none;
    margin-right: 15px;
}

a.router-link-active {
  color: #52301C;
  text-decoration: none;
  font-size: 25px;
  margin-right: 15px;
}

.logo {
    width: 100px;
    border-radius: 20px;
}

.imgRight
{
    width: 38px;
    margin-right: auto;
    margin-left: auto;
}

.left-images {
    display: flex;
}

.left-images img {
    width: 38px;
    margin-right: 20px;
}

nav {
    flex-grow: 1;
    text-align: center;
}

header {
    background-color: #D4B493;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rightText
{
    text-align: center;
    width: 68px;
}

@media (max-width: 768px) {
     header {
                flex-direction: column;
                text-align: center;
            }

            .left-images {
                margin-bottom: 10px;
            }

            .left-images img {
                margin-right: 0;
            }
}

  @media (max-width: 576px) {
            .logo {
                width: 70px;
            }

            .left-images img {
                width: 30px;
            }
        }

</style>