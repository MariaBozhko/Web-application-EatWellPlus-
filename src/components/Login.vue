<script>
import * as yup from 'yup'
import axios from 'axios'
import { inject } from 'vue'

export default {
    name: 'Login',
    data() {
        return {
            formData: {
                name: "" ,
                email: "" ,
                password: ""
            }
        }
    },
    setup(){
        const store = inject('store');
    },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label('Name'),
        email: yup.string().required().email().label('Email address'),
        password: yup.string().required().min(6).label('Password'),
      });
    },
  }, 
    methods: {
    login(){
        axios({
                method: 'post',
                url: 'http://188.225.25.199:8008/auth/authenticate',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    "name": this.formData.name,
                    "email": this.formData.email,
                    "password": this.formData.password
                }
            })
            .then(response => {
                {
                    this.$store.commit('updateT', response.data["access_token"]);
                    this.$store.commit('setAuthState', true);
                    this.$router.push('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    
    }
}
</script>

<template>

    <Form  :validation-schema="schema" className="login" v-slot="{ isSubmitting }">
        <div className="logTitle">
            Вход
        </div>
        <div>
            <div className="logFieldT">
                Имя
            </div>
            <Field name="name" className="logFieldIn" placeholder="Введите имя" type="text"
                v-model="formData.name" />
            <ErrorMessage name="name" />
        </div>
        <div>
            <div className="logFieldT">
                Логин
            </div>
            <Field name="email" className="logFieldIn" type="email" placeholder="Введите почту" v-model="formData.email"/>
            <ErrorMessage name="email" />
        </div>
        <div>
            <div className="logFieldT">
                Пароль
            </div>
            <Field name="password" type="password" className="logFieldIn" placeholder="Введите пароль" v-model="formData.password"/>
            <ErrorMessage name="password" />
        </div>
        <button @click.prevent="login" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">Войти</button>
        <div className="reg">
            Еще нет аккаунта? <RouterLink to="/registration">Зарегистрируйтесь</RouterLink>
        </div>
    </Form>


    <!-- <div class="cont" *ngIf="isOpen">
        <div  class="modal">
            <div class="modal-content">
                <p>Вы ввели неверные данные!</p>
                <p>Проверьте введнные логин и пароль или зарегистрируйтесь.</p>
                <div class="report-btn" (click)="close()">Ок</div>
            </div>
        </div>
</div> -->


</template>

<style scoped>
.login {
    max-width: 450px;
    height: auto;
    background: #FCEDD8;
    border-radius: 10px;
    padding: 14px 22px;
    margin: 50px auto 100px auto;
}

input:focus {
    outline: 2px solid #5D361E;
}

a
{
    color:#5D361E;
    font-size: 20px;
    text-decoration: none;
}

.logTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    text-align: center;
    color: #5D361E;
}

.logFieldT {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 33px;
    color: #5D361E;
    margin: 8px 0;
}

.logFieldIn {
    height: 43px;
    width: 423px;
    padding: 8px 14px;
    background: #FFFFFF;
    border-radius: 8px;
    color: #5D361E;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 20px;
}

button {
    border: none;
    cursor: pointer;
    padding: 8px 0;
    width: 124px;
    font-weight: 400;
    font-size: 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    background: #5D361E;
    border-radius: 10px;
    color: #FCEDD8;
    font-family: 'Arial, sans-serif';
    margin: 20px auto 19px auto;
}

button:active
{
    font-size: 20px;
}

span {
    font-size: 20px;
    color: red;
    font-weight: 600;
}

.reg {
    color: #5D361E;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
}
</style>
