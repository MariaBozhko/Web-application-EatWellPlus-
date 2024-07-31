<script>
import Vegetables from './ProductsPages/Vegetables.vue'
import Headerpr from './ProductsPages/Headerpr.vue'
import Milk from './ProductsPages/Milk.vue';

export default {
    name: 'Products',
    components: {
        Headerpr,
        Vegetables,
        Milk
    }
}
</script>

<template>
    <div className="main">
        <Headerpr />
        <div className="block">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.block
{
    margin-left: 50px;
    margin-right: auto;
}

.main{
    display: flex;
    flex-direction: row;
}
</style>