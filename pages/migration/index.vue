<template>
    <div>
        <main>
            <!-- TODO update image to SVG -->
            <img src="~/assets/icons/migration.png">

            <h2>You've chosen to migrate from Casa Node 1.</h2>
            <p>Migrating from Casa Node 1 will transfer your channels, funds, and settings. To preform the migration, you'll need physicall access to both Casa Nodes.</p>
            <br/>
            <br/>

            <span class="pill">Important Note</span>
            <p>This Cannot be reversed and will revert your Casa Node 1 to factory settings.</p>
        </main>

        <footer>
            <nuxt-link to="/intro" class="button">
                Go Back
            </nuxt-link>
            <nuxt-link to="/migration/prepare" class="button is-primary">
                Begin Migration
            </nuxt-link>
        </footer>
    </div>
</template>

<style lang="scss">
    @import "~/assets/css/variables.scss";

    .pill {
        text-transform: uppercase;
        background-color: $red;
        border: none;
        color: $black;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        border-radius: 8px;
        font-weight: 900;
        width: 120px;
        font-size: 11px;
    }
</style>
