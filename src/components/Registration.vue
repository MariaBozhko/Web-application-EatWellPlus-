<script>
import * as yup from 'yup'
import axios from 'axios'
const routes =[]

export default {
    name: 'Registration',
    checkedFilterList: [] = [],
    checkedCategories: [] = [],
    data() {
        return {
            formData: {
                name: "" ,
                email: "" ,
                password: ""
            }
        }
    },
  
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label('Name'),
        email: yup.string().required().email().label('Email address'),
        password: yup.string().required().min(6).label('Password'),
        passwordConf: yup.string().required().oneOf([yup.ref('password')], 'Passwords do not match').label('Confirmation password'),
      });
    },
  },
    methods: {
        newUser() {
            axios({
                method: 'post',
                url: 'http://188.225.25.199:8008/auth/register',
                data: {
                    "name": this.formData.name,
                    "email": this.formData.email,
                    "password": this.formData.password
                }
            })
                .then(response => {
                   {
                    this.$router.push('/login');
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
    <Form :validation-schema="schema" className="login" v-slot="{ isSubmitting, errors}">
        <div className="login-title">
            Регистрация
        </div>
        <div>
            <div className="login-field__title">
                Имя
            </div>
            <Field name="name" className="login-field__input" placeholder="Введите имя" type="text" v-model="formData.name" />
            <ErrorMessage name="name" />
        </div>
        <div>
            <div className="login-field__title">
                Логин
            </div>
            <Field name="email" className="login-field__input" placeholder="Введите почту" v-model="formData.email"/>
            <ErrorMessage name="email" />
        </div>
        <div className="login-field">
            <div className="login-field__title">
                Пароль
            </div>
            <Field name="password" type="password" placeholder="Введите пароль" className="login-field__input" v-model="formData.password"/>
            <ErrorMessage name="password" />
        </div>
        <div>
            <div className="login-field__title">
                Подтвердите пароль
            </div>
            <Field name="passwordConf" type="password" placeholder="Подтвердите пароль"
                className="login-field__input" />
            <ErrorMessage name="passwordConf" />
        </div>
        <div className="logBtnBlock">
            <button @click.prevent="newUser" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }" v-on:click="submit">
                Зарегистрироваться
            </button>
        </div>
    </form>
</template>

<style scoped>
.logBtnBlock {
    margin-left: auto;
    margin-right: auto;
}

.filter-block {
    width: 562px;
    border: #5D361E solid 2px;
    background-color: #FCEDD8;
    display: flex;
    color: #5D361E;
    justify-content: space-between;
    border-radius: 10px;
    font-size: 18px;
}

.category {
    flex: 1;
    padding: 0 10px;
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

.login {
    width: 562px;
    height: auto;
    background: #FCEDD8;
    border-radius: 10px;
    padding: 27px 38px;
    margin: 50px auto 100px auto;
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
    width: 540px;
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

button {
    border: none;
    cursor: pointer;
    padding: 8px 0;
    width: 250px;
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

.login-forgot-pass {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

input:focus {
    outline: 2px solid #5D361E;
}

span {
    font-size: 20px;
    color: red;
    font-weight: 600;
}
</style>