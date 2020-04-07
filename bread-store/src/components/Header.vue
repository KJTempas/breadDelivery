<template>
    <div class="header">

        <div class="jumbotron">
            <h1 class="dislay-4" id="title"> Wheatfield's Bakery</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.jumbotron {
    background-image: url('../assets/wheatfield.jpg');
    /*Photo by Eric Prouzet on Unsplash*/
    background-position: center;
    background-size: cover;
}
#title {
    font-weight: 400;
    color:blue;
}
</style>