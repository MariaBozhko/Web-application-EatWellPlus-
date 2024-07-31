<script>
import img1 from "@/assets/mail.png"
import img2 from "@/assets/list.png"
import img3 from "@/assets/down.png"
import img4 from "@/assets/up.png"
import img5 from "@/assets/rec1.jpg"
import img6 from "@/assets/rec2.jpg"
import { useRouter } from 'vue-router'
import axios from 'axios'
import  {inject, ref } from 'vue'

export default {
    name: 'Profile',
    data() {
        return {
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            img5: img5,
            img6: img6,
            flagBlock: Boolean = false,
            flagUp: Boolean = false,
            flagDown: Boolean = true,
            flagBlockSecond: Boolean = false,
            flagUpSecond: Boolean = false,
            flagDownSecond: Boolean = true,
            user: {
                name: "",
                email: "",
            }
        }
    },
    setup(){
        const store = inject('store');
        const router = useRouter();
    },
    methods: {
        openBlock1() {
            if (this.flagBlockSecond == false) {
                this.flagBlockSecond = true;
                this.flagDownSecond = false;
                this.flagUpSecond = true;
            }
            else {
                this.flagBlockSecond = false;
                this.flagUpSecond = false;
                this.flagDownSecond = true;
            }
        },
        exit(){
            this.$store.commit('updateT', '');
            this.$store.commit('setAuthState', false);
            this.$router.push('/');
        },
        getUser()
        {
            if (this.flagBlock == false) {
                this.flagBlock = true;
                this.flagDown = false;
                this.flagUp = true;
            }
            else {
                this.flagBlock = false;
                this.flagUp = false;
                this.flagDown = true;
            }
            axios({
                method: 'get',
                url: 'http://188.225.25.199:8008/user/me',
                headers: { 'accept': 'application/json',
                'Authorization': 'Bearer ' + String(this.$store.state.globalState.t)}
            })
                .then(response => {
                   {
                    this.user.name = response.data['name'];
                    this.user.email = response.data['email'];
                   } 
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors
                });
        }
    }
}
</script>

<template>
    <div className="cont">
        <div className="block1">
            <div className="heading">Личная информация</div>
            <div className="upDown" @click.prevent="getUser">
                <img v-if="flagDown" :src="img3" className="img3" />
                <img v-if="flagUp" :src="img4" className="img3" />
            </div>
        </div>
    </div>

    <div v-if="flagBlock" className="cont2">
        <div className="surnameName">{{ user.name }}</div>
        <div className="block1">
            <img :src="img1" className="img1" />
            <div className="text">{{ user.email }}</div>
        </div>
    </div>

    <div className="cont">
        <div className="block1">
            <div className="heading">Мои заказы</div>
            <div className="upDown" @click="openBlock1">
                <img v-if="flagDownSecond" :src="img3" className="img3" />
                <img v-if="flagUpSecond" :src="img4" className="img3" />
            </div>
        </div>
        <button className="signOut" @click="exit">Выйти</button>
    </div>

    <div v-if="flagBlockSecond" className="cont2">
        <div  className="border">
            <div className="block-row">
                <div className="textBorder">
                    <div>Номер заказа: 3094999</div>
                </div>
                <div className="textBorderRight">
                    <div>Cумма заказа: 3094999</div>
                </div>
            </div>

            <div className="cart">
                <div className="cart-item">
                    <div className="item-details">
                        <img :src="img5">
                        <div>
                            <h2>Название блюда 1</h2>
                            <p>Цена: $10.99</p>
                            <p>Количество: 2</p>
                        </div>
                    </div>
                </div>
                <div className="cart-item">
                    <div className="item-details">
                        <img :src="img6">
                        <div>
                            <h2>Название блюда 2</h2>
                            <p>Цена: $8.49</p>
                            <p>Количество: 1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.signOut
{
    background-color: #5D361E;
    color: #FCEDD8;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    width: 100px;
    font-size: 16px;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 80px;
}

li {
    font-size: 16px;
    margin-left: -12px;
}

.heading {
    font-weight: 700;
    font-size: 20px;
    color: #52301C;
    margin-top: 9px;
    margin-left: 10px;
}

.surnameName {
    font-size: 18px;
    margin-top: 10px;
    margin-left: 16px;
}

.cont {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #FCEDD8;
    width: 600px;
    margin: 40px auto 0 auto;
    padding-left: 7px;
    height: 40px;
}

.cont2 {
    display: flex;
    flex-direction: column;
    border-radius: 0 0 10px 10px;
    background-color: #FCEDD8;
    width: 606px;
    margin: -6px auto 30px auto;
    height: auto;
}

.block1 {
    flex-direction: row;
    display: flex;
    margin-left: 2px;
}

.img1 {
    width: 30px;
    height: 30px;
    margin: 10px;
}

.img2 {
    width: 30px;
    height: 30px;
    margin: 10px;
}

.img3 {
    width: 20px;
    height: 20px;
}

.upDown {
    margin-left: auto;
    margin-right: 15px;
    margin-top: 10px;
}

.block2 {
    flex-direction: column;
    display: flex;
}

.text {
    font-size: 18px;
    margin: 15px 0 0 10px;
    color: #52301C;
}

li {
    color: #52301C;
}

.cart
{
    margin-left: auto;
    margin-right: auto;
    width: 550px;
    margin-top: 10px
}

.cart-item {
    display: flex;
    border:  #5D361E dotted 2px;
    border-radius: 10px;
    margin-bottom: 20px;
    color:#5D361E;
    font-size: 18px;
    padding: 10px;
}

.item-details {
    display: flex;
    align-items: center;
}

.item-details img {
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

.textBorder {
    font-size: 18px;
    color: #5D361E;
    height: 30px;
    width: 186px;
    border: #5D361E dotted 2px;
    border-radius: 8px;
    margin-left: 14px;
    font-weight: 600;
    padding: 9px 5px 0 5px;
    margin-top: 7px;
}

.textBorderRight
{
    font-size: 18px;
    color: #5D361E;
    height: 30px;
    width: 186px;
    border: #5D361E dotted 2px;
    border-radius: 8px;
    margin-right: 14px;
    margin-left: auto;
    font-weight: 600;
    padding: 9px 5px 0 5px;
    margin-top: 7px;
}

.block-row{
    flex-direction: row;
    display: flex;
    margin-top:5px;
}

.border
{
    border: #5D361E solid 2px;
    width: 580px;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
}
</style>