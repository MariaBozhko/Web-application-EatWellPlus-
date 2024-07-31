<script>
import img1 from "@/assets/mainPhoto.png"

export default {
    name: 'Main',
    data() {
        return {
            img1: img1,
        }
    }
}
</script>

<template>
    <div className="block1">
        <img :src="img1">

        <div className="block2">
            <div className="block3">
                <div className="podblock3">Подбор блюд и продуктов в соответствии с вашими предпочтениями и их доставка
                </div>
            </div>
            <div className="block4">
                <div className="podblock4">База здоровых рецептов</div>
            </div>
            <div className="block5">
                <div className="podblock5"> Продукты для ПП </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 900px;
    height: 474px;
}

.block1 {
    width: 900px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
}

.block2 {
    display: flex;
    flex-direction: row;
    height: 126px;
    font-size: 20px;
    color: #5D361E;
    font-weight: 700;
}

.block3 {
    background-color: #FCEDD8;
    width: 349px;
    border-radius: 25px;
    margin-right: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 2px 2px 4px #D4B493;
}
.podblock3
{
    width: 275px;
    height: 81px;
}

.block4 {
    background-color: #FCEDD8;
    width: 242px;
    border-radius: 25px;
    margin-right: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 2px 2px 4px #D4B493;
}

.podblock4
{
    width: 151px;
    height: 33px;
}

.block5 {
    background-color: #FCEDD8;
    width: 193px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 2px 2px 4px #D4B493;
}

.podblock5
{
    width: 100px;
    height: 40px;
}


</style>
