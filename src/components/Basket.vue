<script>
import axios from 'axios'
import { inject, ref, reactive,computed } from 'vue'
import img1 from "@/assets/minus.png"
import img2 from "@/assets/plus.png"
import { useRouter } from 'vue-router'

export default {
    name: 'Basket',
    data() {
        return {
            img1: img1,
            img2: img2,
            checkedList2: [] = [],
            flagPlus: Boolean = true,
        }
    },
    setup() {
        const router = useRouter();
        const store = inject('store');
        const basketItems = ref([]);
        const flagEmpty = computed(() => store.state.globalState.flagEmpty);
        const flagAddressFirst = ref(false);
        const flagAddressSecond = ref(false);
        const flagAdd = ref(false);
        const orderDone=ref(false);
        const flagBtn = ref(false);
        const address = ref('');
        const numOrder = ref(1);
        const cost =  ref(0);
        const res = ref({});
        const addressModel = reactive({
            a: "",
            apartment: "",
            floor: "",
            entrance: ""
        });
        const idBasket=ref(1);
        const idAddress=ref(1);
        axios({
            method: 'get',
            url: 'http://188.225.25.199:8008/address/get_addresses',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + String(store.state.globalState.t)
            }
        }).then(response => {
            res.value = response.data; 
           if (Object.keys(res.value).length === 0 && res.value.constructor === Object)
           {
            flagAddressFirst.value=true;
           }
           else{
            idAddress.value = response.data[1].id;
            address.value = response.data[1].address.split(" ");
            addressModel.a=address.value[0];
            addressModel.apartment=address.value[1];
            addressModel.floor=address.value[2];
            addressModel.entrance=address.value[3];
            flagAddressSecond.value=true;
           }
        }).catch(error => {
          console.log(error);
        });

        axios({
            method: 'get',
            url: 'http://188.225.25.199:8008/backet/get_basket',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + String(store.state.globalState.t)
            }
        }).then(response => {
            const data = response.data;
            idBasket.value = response.data[1].id;
            store.commit('setEmptyFlag', false);
            basketItems.value = Object.keys(data).map((key) => {
                const item = data[key];
                return {
                    id: item.id,
                    item_name: item.item_name,
                    item_calories: item.item_calories,
                    item_weight: item.item_weight,
                    price: item.price,
                    
                    item_type: item.item_type.toLowerCase().split(', '),
                    quantity: item.quantity,
                };
            });
        }).catch(error => {
           if(error.response && error.response.status === 404)
           {
            store.commit('setEmptyFlag', true);
           };
        });

        const totalPrice = computed(() => {
      return basketItems.value.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
    });

        const plus = (name, quantity, curQ) => {
            curQ += quantity;
            let id = JSON.parse(localStorage.getItem(name));
            axios({
                method: 'patch',
                url: `http://188.225.25.199:8008/backet/update_quantity_in_basket?item_id=${id}&new_quantity=${curQ}`,
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + String(store.state.globalState.t)
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error('Error:', error);
            });
        };

        const removeAllItemsEndingWithB = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.endsWith('b')) {
            let id = JSON.parse(localStorage.getItem(key));
            axios({
                method: 'delete',
                url: `http://188.225.25.199:8008/backet/remove_from_basket?item_id=${id}`,
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + String(store.state.globalState.t)
                }
            }).then(response => {
                console.log(`Item with id ${id} removed from basket`);
                localStorage.removeItem(key);
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    }
};

        const remove = (name) => {
            let id = JSON.parse(localStorage.getItem(name));
            axios({
                method: 'delete',
                url: `http://188.225.25.199:8008/backet/remove_from_basket?item_id=${id}`,
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + String(store.state.globalState.t)
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error('Error:', error);
            });
        };

      const  add = () =>{
        flagAdd.value=true;
        flagAddressFirst.value=false;
      };

      const orderOpen = () => {
        flagBtn.value=true;
      };

      const close = () => {
        orderDone.value=false;
       router.push('/notification');
      }

      const addAddress = () => {
        axios({
                 method: 'put',
                 url: `http://188.225.25.199:8008/address/add_address`,
                 headers: {
                     'accept': '*/*' ,
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + String(store.state.globalState.t)
                 },
                 data: {
                     "address": addressModel.a+ ' '+addressModel.apartment+' '+addressModel.floor+' '+
                     addressModel.entrance
                 }
             }).then(response => {
                idAddress.value = response.data;
             }).catch(error => {
                 console.error('Error:', error);
             });
      };
      
      const order = () => {
        flagBtn.value=false;
            axios({
            method: 'put',
            url: `http://188.225.25.199:8008/order/create_order?address_id=${idAddress.value}&food_basket_id=${idBasket.value}`,
            headers: {
                'accept': '*/*' ,
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(store.state.globalState.t)
            }
        }).then(response => {
            numOrder.value=response.data;
            removeAllItemsEndingWithB();
            orderDone.value=true;
        }).catch(error => {
            console.error('Error:', error);
        });
      };
        return {
            basketItems,
            plus,
            remove,
            flagEmpty,
            flagAddressFirst,
            addressModel,
            flagAdd,
            add,
            idBasket,
            idAddress,
            orderOpen,
            flagBtn,
            order,
            flagAddressSecond,
            res,
            address,
            numOrder,
            orderDone,
            close,
            addAddress,
            removeAllItemsEndingWithB,
            totalPrice
        };
    }
}
</script>

<template>
    <div className='empty' v-if="flagEmpty">Товаров нет в корзине</div>
    <div className="container" v-if="!flagEmpty">

        <div className="block-column">

            <div className="block-row">
                <div v-for="(b, index) in basketItems" :key="index" v-if="!flagEmpty"
                    style="border: #5D361E solid 2px; border-radius: 10px; margin-bottom: 20px;">
                    <div className="cart-item">
                        <div className="item-details">
                            <h2>{{ b.item_name }}</h2>
                            <div>
                                <div className="block2">
                                    <div className="text">
                                        <div>{{ b.item_calories }} ккал</div>
                                    </div>
                                    <div className="text">
                                        <div>{{ b.item_weight }} г</div>
                                    </div>
                                </div>
                                <div className="block2">
                                    <div class="text" v-for="(type, idx) in b.item_type" :key="idx">
                                        {{ type }}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='price'>{{ b.price }} р</div>
                    <div className="minusPlusBlock">
                        <div className="minusBlock">
                            <img className="minus" :src="img1" @click="remove(b.item_name)" />
                        </div>
                        <div className="numText">
                            <div className="num">
                                {{ b.quantity }}
                            </div>
                        </div>
                        <div className="plusBlock" @click="plus(b.item_name, 1, b.quantity)">
                            <img :src="img2" className="plus" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="order-summary" v-if="!flagEmpty">
                <h2>Итог заказа</h2>
                <p>Сумма заказа: {{ totalPrice }} р</p>
                <p>Номер корзины: {{ idBasket }}</p>
                <button @click="orderOpen">Оформить заказ</button>
            </div>
        </div>
    </div>
    <div className="cont" v-if="orderDone">
        <div className="modal">
            <div className="modal-content">
                <p>Вы сделали заказ, ожидайте уведомления о доставке.</p>
                <p>Ваш заказ под номером {{ numOrder }}</p>
                <div className="report-btn" @click="close">Ок</div>
            </div>
        </div>
    </div>
    <div className="cont" v-if="flagBtn">
        <div className="modal">
            <form className="modal-content">
                <div className="login-title">
                    Оформления заказа
                </div>
                <div className="box" v-if="flagAddressFirst">
                    <div>Добавить адрес</div>
                    <div className="plus" @click="add()">+</div>
                </div>
                <div className="boxAddress" v-if="flagAddressSecond">
                    <div>
                        <div>{{ addressModel.a }}</div>
                        <div>кв. {{ addressModel.apartment }}, эт. {{ addressModel.floor }}, п. {{ addressModel.entrance}}</div>
                    </div>
                    <div className="plusTwo" @click="add">+</div>
                </div>
                <div v-if="flagAdd">
                    <div>
                        <div className="login-field__title">
                            Адрес доставки
                        </div>
                        <input placeholder="Введите адрес" className="login-field__input" v-model="addressModel.a"
                            type="text" />
                    </div>
                    <div className="blockRowInf">
                        <div className="indent">
                            <div className="login-field__title">
                                Квартира
                            </div>
                            <input className="login-field__input_min" type="text" v-model="addressModel.apartment" />
                        </div>
                        <div className="indent">
                            <div className="login-field__title">
                                Этаж
                            </div>
                            <input className="login-field__input_min" type="text" v-model="addressModel.floor" />
                        </div>
                        <div className="indent">
                            <div className="login-field__title">
                                Подъезд
                            </div>
                            <input className="login-field__input_min" type="text" v-model="addressModel.entrance" />
                        </div>
                    </div>
                    <div className="report-btn" @click="addAddress">Добавить</div>
                </div>
           

                <div>
                    <div className="login-field__title">
                        Способ оплаты (при получении)
                    </div>
                    <div class="switch-field">
                        <input type="radio" id="radio-one" name="switch-one" v-model="checkedList2" value="Наличными" />
                        <label for="radio-one">Наличными</label>
                        <input type="radio" id="radio-two" name="switch-one" v-model="checkedList2" value="Картой" />
                        <label for="radio-two">Картой</label>
                    </div>
                </div>
                <div className="blockRowPrice">
                    <div>
                        Сумма заказа
                    </div>
                    <div className="rightText">
                        {{ totalPrice }} р
                    </div>
                </div>
                <div className="report-btn" @click="order">Оформить</div>
            </form>
        </div>
    </div>

</template>

<style scoped>
.plus {
    width: 32px;
    height: 32px;
}

.minus {
    width: 28px;
}

.price {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
}

.empty{
    text-align: center;
    font-size: 20px;
    height: 33px;
    padding-top: 10px;
    font-weight: 700;
    margin-top: 20px;
    background-color: #FCEDD8;
    color: #5D361E;
    border-radius: 10px;
    width: 500px;
    margin-right: auto;
    margin-left: auto;
}

.blockRowInf {
    flex-direction: row;
    display: flex;
}

.block2 {
    flex-direction: row;
    display: flex;
    width: 250px;
    margin-top: 10px;
}

.blockRowPrice {
    flex-direction: row;
    display: flex;
    font-size: 20px;
    font-weight: 700;
}

.numText {
    font-size: 18px;
    color: #FCEDD8;
    border-radius: 8px;
    background-color: #5D361E;
    width: 33px;
    height: 32px;
    text-align: center;
    margin-left: auto;
}

.minusBlock {
    margin-left: 10px;
}

.plusBlock {
    margin-left: 20px;
}

.num {
    padding-top: 5px;
}

.rightText {
    margin-right: 0px;
    margin-left: auto;
}

.box {
    border-radius: 10px;
    height: 45px;
    color: #5D361E;
    border: #5D361E solid 2px;
    text-align: center;
    padding: 20px 0;
    margin-top: 12px;
}

.boxAddress {
    border-radius: 10px;
    height: 45px;
    color: #5D361E;
    padding: 40px 20px;
    margin-top: 12px;
    border: #5D361E solid 2px;
    flex-direction: row;
    display: flex;
}

.container {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    display: flex;
}

.minusPlusBlock {
    flex-direction: row;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    height: 32px;
    margin-top: 15px;
    margin-bottom: 10px;
    width: 142px;
}

.block-row {
    width: 500px;
    padding: 15px;
    margin-right: 50px;
    background-color: #FCEDD8;
    border-radius: 10px;
    box-shadow: 2px 2px 4px #D4B493;
}

.block-column {
    flex-direction: row;
    display: flex;
    margin-bottom: 30px;
}

.cart-item {
    color: #5D361E;
    font-size: 18px;
    padding: 10px;
}

.item-details {
    align-items: center;
}

.item-details-img {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 5px;
}

.item-details div {
    flex: 1;
}

.item-details h2 {
    margin-top: 0;
    font-size: 20px;
}

.text {
    font-size: 18px;
    color: #5D361E;
    text-align: center;
    width: 138px;
    height: 30px;
    border: #5D361E solid 2px;
    border-radius: 8px;
    margin-left: 15px;
    font-weight: 600;
    padding: 9px 5px 0 5px;
    margin-top: 7px;
}

.order-summary {
    background-color: #FCEDD8;
    padding: 20px;
    width: 190px;
    height: 150px;
    text-align: center;
    box-shadow: 2px 2px 4px #D4B493;
    border-radius: 10px;
    color: #5D361E;
}

.order-summary h2 {
    margin-top: 0;
    font-size: 20px;
}

.order-summary p {
    margin-bottom: 10px;
    font-size: 18px;
}

.order-summary button {
    background-color: #5D361E;
    color: #FCEDD8;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    border-radius: 10px;
}

.cont {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #FCEDD8;
    margin: 319px auto 0 auto;
    height: auto;
    border-radius: 10px;
    width: 470px;
    font-size: 20px;
    color: #52301C;
    padding: 27px 38px;
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
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #FCEDD8;
    background: #52301C;
    border-radius: 7px;
    width: 105px;
    cursor: pointer;
    margin: 10px auto;
}

.login-title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    text-align: center;
    color: #5D361E;
}

.login-field__title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 33px;
    color: #5D361E;
    margin: 8px 0;
}

.login-field__input {
    height: 33px;
    width: 446px;
    padding: 8px 14px;
    background: #FFFFFF;
    border-radius: 8px;
    color: #5D361E;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 20px;
}

.login-field__input_min {
    height: 33px;
    width: 80px;
    padding: 8px 14px;
    background: #FFFFFF;
    border-radius: 8px;
    color: #5D361E;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 20px;
}

.indent {
    margin-right: 35px;
}

.logBtn {
    font-weight: 400;
    font-size: 20px;
}

input:focus {
    outline: 2px solid #5D361E;
}

.switch-field {
    display: flex;
    margin-bottom: 36px;
    overflow: hidden;
}

.switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
}

.switch-field label {
    color: #5D361E;
    font-size: 18px;
    line-height: 1;
    text-align: center;
    padding: 8px 16px;
    margin-right: -1px;
    border: 1px solid #5D361E;
    transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
    cursor: pointer;
}

.switch-field input:checked+label {
    background-color: #5D361E;
    box-shadow: none;
    color: white;
}

.switch-field label:first-of-type {
    border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
    border-radius: 0 4px 4px 0;
}

.plus {
    font-weight: 700;
    font-size: 32px;
    margin-right: auto;
    margin-left: auto;
}

.plusTwo {
    font-size: 32px;
    margin-right: 0px;
    margin-left: auto;
    margin-top: auto;
    margin-left: auto;
}
</style>