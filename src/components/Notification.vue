<script>
export default {
    name: 'Notification',
}
</script>

<template>
    <div className="block1">
        <div className="cont">
            <div className="block2">
                <div className="numText">
                    <div className="num">
                        1
                    </div>
                </div>
                <div className="text">Ваш заказ будет доставлен через 10 мин</div>
            </div>
        </div>
        <div className="cont">
            <div className="block2">
                <div className="numText">
                    <div className="num">
                        2
                    </div>
                </div>
                <div className="text">Ваш заказ будет доставлен через 10 мин</div>
            </div>
        </div>
        <div className="cont">
            <div className="block2">
                <div className="numText">
                    <div className="num">
                        3
                    </div>
                </div>
                <div className="text">Ваш заказ будет доставлен через 10 мин</div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.cont {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #FCEDD8;
    width: 600px;
    margin: 15px auto;
    height: 45px;
    box-shadow: 2px 2px 4px #D4B493;
}

.block2 {
    flex-direction: row;
    display: flex;
}

.block1 {
    flex-direction: column;
    display: flex;
    margin-top: 30px;
}
.numText
{
    font-size: 18px;
    color: #FCEDD8;
    border-radius: 8px;
    background-color: #5D361E;
    width: 33px;
    height: 32px;
    margin: 7px 0 6px 7px;
    text-align: center;
}

.num
{
    padding-top: 5px;
}

.text
{
    font-size: 18px;
    color: #5D361E;
    margin-top: 12px;
    margin-left: 15px;
}
</style>