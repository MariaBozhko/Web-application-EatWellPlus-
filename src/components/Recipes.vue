<script>
import img1 from "@/assets/rec1.jpg"
import img2 from "@/assets/rec2.jpg"
import img3 from "@/assets/rec3.jpg"

export default {
    name: 'Recipes',
    data() {
        return {
            img1: img1,
            img2: img2,
            img3: img3,
        }
    }
}
</script>

<template>
    <div className="recipe">
        <div className="recipe-image">
            <img :src="img3">
        </div>
        <div className="recipe-details">
            <div className="recipe-title">
                <h2>Куриный карри с овощами</h2>
            </div>
            <div className="recipe-content">
                <p>Ингредиенты: куриное филе, кокосовое молоко, картофель, морковь, лук, чеснок...</p>
                <p>Время приготовления: 30 минут</p>
                <ol>
                    <li>Обжарить нарезанный лук, чеснок и имбирь в кастрюле</li>
                    <li>Добавить нарезанные куриное филе и обжаривать до золотистого цвета</li>
                    <li>Добавить нарезанные картофель и морковь, кокосовое молоко, карри-пасту, специи, соль и перец
                    </li>
                    <li>Варить до готовности овощей и куриного филе</li>
                </ol>
            </div>
        </div>
    </div>

    <div className="recipe">
        <div className="recipe-image">
            <img :src="img1">
        </div>
        <div className="recipe-details">
            <div className="recipe-title">
                <h2>Спагетти с томатным соусом и базиликом</h2>
            </div>
            <div className="recipe-content">
                <p>Ингредиенты: спагетти, помидоры, чеснок, лук, оливковое масло, томаты...</p>
                <p>Время приготовления: 20 минут</p>
                <ol>
                    <li>Сварить спагетти по инструкции на упаковке</li>
                    <li>Обжарить нарезанный лук и чеснок на оливковом масле до мягкости</li>
                    <li>Добавить нарезанные помидоры и томаты в собственном соку, довести до кипения</li>
                    <li>Подавать со спагетти и посыпать нарезанным базиликом и пармезаном</li>
                </ol>
            </div>
        </div>
    </div>

    <div className="recipe">
        <div className="recipe-image">
            <img :src="img2">
        </div>
        <div className="recipe-details">
            <div className="recipe-title">
                <h2>Овощной рагу с картофелем</h2>
            </div>
            <div className="recipe-content">
                <p>Ингредиенты: картофель, баклажаны, красный перец, помидоры, лук, чеснок...</p>
                <p>Время приготовления: 40 минут</p>
                <ol>
                    <li>Обжарить нарезанный лук и чеснок на оливковом масле</li>
                    <li>Добавить нарезанный картофель, баклажаны, красный перец и помидоры</li>
                    <li>Подавать, посыпав нарезанной зеленью</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recipe {
    display: flex;
    width: 600px;
    background-color: #f2f2f2;
    margin-bottom: 20px;
    border-radius: 15px;
    margin-left: auto;
    margin-right: auto;
    color: #5D361E;
    background:#FCEDD8;
    margin-top:30px;
}

img{
    border-radius: 5px;
    margin: 15px 10px;
    width: 200px;
    height: 150px;
}



.recipe-details {
    flex: 1;
    padding-left: 30px;
    padding-right: 30px;
}

.recipe-title h2 {
    font-size: 18px;
}

.recipe-content p {
    margin: 5px 0;
    font-size: 16px;
}

.recipe-content ol {
    margin-top: 5px;
    padding-left: 20px;
}
</style>