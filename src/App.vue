<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Profile from './components/Profile.vue'
import Main from './components/Main.vue'
import Dishes from './components/Dishes.vue'
import Basket from './components/Basket.vue'
import Notification from './components/Notification.vue'
import Recipes from './components/Recipes.vue'
import Login from './components/Login.vue'
import Registration from './components/Registration.vue'
import Products from './components/Products.vue'

export default {

	components: {
		Header,
		Footer,
		Profile,
		Main,
		Dishes,
		Basket,
		Notification,
		Recipes,
		Login,
		Registration,
		Products
	}
}
</script>

<template>
	<Header />
	<router-view />
	<Footer />
</template>
