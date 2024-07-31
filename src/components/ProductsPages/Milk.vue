<script>
import axios from 'axios'
import { ref, inject, onMounted, computed } from 'vue'
import img1 from "@/assets/search.png"

export default {
    name: 'Milk',
    data() {
        return {
            img1: img1,
        }
    },
    setup() {
        const store = inject('store');
        localStorage.clear();
        const searchQuery = ref('');
        const dishes = ref([]);
        const saveItemsToLocalStorage = (items) => {
            items.forEach(item => {
                localStorage.setItem(item.name, item.id);
            });
        };
        const fetchNutritionData = async () => {
            const response = await axios({
          method: 'get',
          url: 'http://188.225.25.199:8008/backet/get_all_nutrition?flag=false',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + String(store.state.globalState.t)
          }
        });
        localStorage.clear();
        const data = Object.values(response.data);
        saveItemsToLocalStorage(data);
        dishes.value = data
          .filter(item => item.type.includes('Молоко и яйца'))
          .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            ingredients: item.ingredients,
            photo: item.photo,
            calories: item.calories,
            weight: item.weight,
            type: item.type,
            price: item.price,
            imageUrl: `http://188.225.25.199:8008/images/${item.photo}`,
            flagFirst:true,
            flagSecond:false
            }));
      
        };
        const filteredAndGroupedDishes = computed(() => {
            let filteredDishes = dishes.value;

            if (searchQuery.value.trim() !== '') {
                const searchLowerCase = searchQuery.value.toLowerCase();
                filteredDishes = filteredDishes.filter(dish =>
                    dish.name.toLowerCase().includes(searchLowerCase)
                );
            }

            const result = [];
            const chunkSize = 3;

            for (let i = 0; i < filteredDishes.length; i += chunkSize) {
                result.push(filteredDishes.slice(i, i + chunkSize));
            }

            return result;
        });


    const addBasket = async (item_id, quantity) => {
      try {
        await axios({
          method: 'put',
          url: `http://188.225.25.199:8008/backet/add_nutrition_to_basket?flag=false&item_id=${item_id}&quantity=${quantity}`,
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + String(store.state.globalState.t)
          }
        });
        const itemIndex = dishes.value.findIndex(dish => dish.id === item_id);
        if (itemIndex !== -1) {
            dishes.value[itemIndex].flagSecond = true;
            dishes.value[itemIndex].flagFirst = false;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    onMounted(() => {
      fetchNutritionData();
    });
    
        return {
            searchQuery,
            dishes,
            filteredAndGroupedDishes,
            addBasket
        };
   }
}
</script>

<template>
    <div className="block">
        <div className="row">
            <input type="text" placeholder="Найти блюдо..." v-model="searchQuery" />
            <button className="but">
                <img :src="img1" className="searchImg" />
            </button>
        </div>
    </div>
    <div className="container" v-for="(group, groupIndex) in filteredAndGroupedDishes" :key="groupIndex">
        <section className="card" v-for="(dish, index) in group" :key="index">
            <div className="product-image">
                <img :src="dish.imageUrl" className="product-image-in" />
            </div>
            <div className="product-info">
                <div className="name">{{ dish.name }}</div>
                <div className="description">{{ dish.description }}</div>
                <div className="block2">
                    <div className="text">
                        <div>{{ dish.weight }} г</div>
                    </div>
                    <div className="text">
                        <div> {{ dish.calories }} ккал</div>
                    </div>
                </div>
            </div>
            <div className="btn" v-if="dish.flagFirst">
                <div className="textPrice">{{ dish.price }} р.</div>
                <button className="buy-btn" @click="addBasket(dish.id,1)">Добавить</button>
            </div>
            <div className="btn" v-if="dish.flagSecond">
                <button className="buy-btn-done">Уже в корзине</button>
            </div>
        </section>
    </div>

</template>

<style scoped>
.cont {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #FCEDD8;
    margin: 319px auto 150px auto;
    padding: 4px;
    height: auto;
    border-radius: 10px;
    width: 560px;
    font-size: 20px;
    color: #52301C;
    text-align: center;
    box-shadow: -1px 15px 30px -12px rgb(32, 32, 32);
}

.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.report-btn {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
    background: #52301C;
    border-radius: 10px;
    width: 100px;
    cursor: pointer;
    margin: 35px auto 15px auto;
    font-weight: 600;
}

.buy-btn {
    background-color: #52301C;
    padding: 0.6rem 0.5rem;
    font-weight: 600;
    font-size: 20px;
    transition: 300ms ease;
    border-radius: 0.5rem;
    width: 130px;
    font-family: 'Arial, sans-serif';
}

.block2 {
    flex-direction: row;
    display: flex;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
}

.numText {
    font-size: 18px;
    color: white;
    border-radius: 8px;
    background-color: #52301C;
    width: auto;
    height: 32px;
    margin: 7px 0 6px 7px;
    text-align: center;
    padding: 5px;
}

.filter {
    flex-direction: column;
    width: 600px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
}

.num {
    padding-top: 5px;
}

.text {
    font-size: 18px;
    color: #5D361E;
    height: 30px;
    border: #5D361E solid 2px;
    border-radius: 8px;
    margin-left: 15px;
    font-weight: 600;
    padding: 9px 5px 0 5px;
    margin-top: 7px;
}

.textPrice {
    font-size: 20px;
    color: #5D361E;
    border-radius: 8px;
    font-weight: 700;
    margin-top: auto;
    margin-bottom: auto;
}

.block {
    height: 40px;
    border-radius: 10px;
    display: block;
    margin-top: 70px;
    border: 2px solid #5D361E;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.block1 {
    flex-direction: row;
    display: flex;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}

.imgBtn {
    width: 23px;
    height: 23px;
    margin-left: 12px;
}

.row {
    display: flex;
    align-items: center;
    padding: 0 0 5px 17px;
}

.textOnBlock {
    font-size: 18px;
    background: #FCEDD8;
    color: #5D361E;
    text-align: center;
    border-radius: 10px;
    margin-right: 20px;
    padding: 8px 16px;
}

.block-row {
    display: flex;
    flex-direction: row;
}

.btnFilter {
    font-size: 18px;
    background: #FCEDD8;
    color: #5D361E;
    text-align: center;
    right: 0;
    border-radius: 10px;
    padding: 8px 11px;
    width: 137px;
    margin-top: 14px;
}

input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: 0;
    font-size: 18px;
    color: #52301C;
    margin-top: -5px;
}

::placeholder {
    font-size: 16px;
}

.but {
    background: transparent;
    border: 0;
    outline: 0;
    width: 39px;
    height: 37px;
    margin: 5px 9px 7px 0;
    cursor: pointer;
}

button {
    display: inline-block;
    border: none;
    outline: none;
    border-radius: 0.2rem;
    color: white;
    cursor: pointer;
}

a {
    text-decoration: none;
}

.searchImg {
    max-width: 100%;
    user-select: none;
    border-radius: 0.5rem;
}

.container {
    width: 1037px;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

.card {
    position: relative;
    padding: 1rem;
    width: 350px;
    height: auto;
    box-shadow: -1px 15px 30px -12px rgb(32, 32, 32);
    border-radius: 0.9rem;
    background-color: #FCEDD8;
    color: #fbf7f7;
    cursor: pointer;
    margin-right: 20px;
}

.description {
    width: 330px;
    height: 165px;
    margin-left: auto;
    margin-right: auto;
}

.product-image {
    width: 264px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
}

.product-image-in {
    width: 264px;
    height: 190px;
    border-radius: 10px;
}

.product-info {
    text-align: center;
    color: #52301C;
}

.name {
    font-size: 20px;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 20px;
}

.price {
    font-size: 1.4rem;
    font-weight: 800;
}

.btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
}

.buy-btn-done {
    background-color: #D4B493;
    padding: 0.6rem 3.5rem;
    font-weight: 600;
    font-size: 1rem;
    transition: 300ms ease;
    border-radius: 0.5rem;
    color: #52301C;
}

.fav {
    box-sizing: border-box;
    background: #fff;
    padding: 0.5rem 0.5rem;
    border: 1px solid#000;
    display: grid;
    place-items: center;
}

.svg {
    height: 25px;
    width: 25px;
    fill: #fff;
    transition: all 500ms ease;
}

.fav:hover .svg {
    fill: #000;
}

.filter-block {
    width: 600px;
    background-color: #FCEDD8;
    display: flex;
    color: #5D361E;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    font-size: 18px;
    margin-top: 30px;
}

.category {
    flex: 1;
    padding: 10px 15px;
}

.filter-list {
    list-style-type: none;
    padding: 0;
}

.filter-list li {
    margin-bottom: 5px;
}

.filter-list input[type="checkbox"] {
    margin-right: 5px;
}

p {
    font-weight: 600;
}

@media screen and (max-width: 800px) {
    .container {
        padding: 2rem 0;
        width: 100%;
        flex-direction: column;
        gap: 3rem;
    }
}

.text-block {
    background-color: red;
    display: inline-block;
    padding: 10px 20px;
}

.text-block p {
    margin: 0;
    text-align: center;
    color: white;
    /* Цвет текста */
}
</style>