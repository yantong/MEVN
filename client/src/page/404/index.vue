<style scoped>
    div {
        height: 100vh;
        overflow: hidden;
    }

    div::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    }

    img {
        height: auto;
        width: 100%;
        vertical-align: middle;
        display: inline-block;
    }
</style>

<template>
    <div>
        <img src="../../assets/404.jpg" alt="#"> 
    </div>
</template>
