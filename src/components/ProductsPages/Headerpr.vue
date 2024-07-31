<script>
export default {
    name: 'Headerpr',
}
</script>

<template>
    <div className="sidebar">
        <nav className="nav">
            <ul>
                <li><router-link :to="{ name: 'Vegetables' }">Овощи и зелень</router-link></li>
                <li><router-link :to="{ name: 'Milk' }">Молоко и яйца</router-link></li>
                <li><a href="#">Фрукты и ягоды</a></li>
                <li><a href="#">Мясо и птица</a></li>
                <li><a href="#">Рыба и морепродукты</a></li>
            </ul>
        </nav>
    </div>
</template>


<style scoped>
.sidebar {
    width: 370px;
    height: 514px;
    background-color: #FCEDD8;
    font-size: 20px;
    box-shadow: 2px 2px 4px #D4B493;
    margin-top: 70px;
    border-radius: 36px;
    margin-left: 20px;
}

.nav {
    position: relative;
    top: 220px;
    transform: translateY(-50%);
}

ul {
    list-style: none;
}

li {
    position: relative;
    margin: 1.2em 0;
}

a {
    line-height: 3em;
    text-decoration: none;
    letter-spacing: 0.1em;
    font-weight: 600;
    width: 278px;
    color: #5D361E;
    display: block;
    border-bottom: 1px solid #5D361E;
}

&.active a {
    color: white;
}
</style>