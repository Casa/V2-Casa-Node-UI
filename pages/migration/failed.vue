<template>
    <div>
        <main>
            <img class="warning" src="~/assets/icons/circle-warning.svg">

            <h2>Sorry, the migration wasn't successful.</h2>
            <p>Something went wrong and we couldn't complete the migration. Casa Node 1 is still operational and retains all funds and settings.</p>
        </main>

        <footer>
            <nuxt-link to="/intro" class="button">
                Cancel Migration
            </nuxt-link>
            <nuxt-link to="/migration" class="button is-primary">
                Restart Migration
            </nuxt-link>
        </footer>
    </div>
</template>

<style lang="scss">
    @import "~/assets/css/variables.scss";

    .warning {
        width: 80px;
        height: 80px;
    }
</style>
