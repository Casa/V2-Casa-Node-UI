<template>
    <div>
        <main>
            <!-- TODO update image -->
            <img src="~/assets/logos/casa.svg">

            <h2>You've chosen to migrate from Casa Node 1.</h2>
            <p>Migrating from Casa Node 1 will transfer your channels, funds, and settings. To Preform the migration, you'll need physicall access to both Casa Nodes.</p>
            <br/>
            <br/>

            <!-- TODO add IMPORTANT NOTE -->

            <p>This Cannot be reversed and will revert your Casa Node 1 to factory settings.</p>
        </main>

        <footer>
            <nuxt-link to="/intro" class="button">
                Go Back
            </nuxt-link>
            <nuxt-link to="/migration/prepare-v1" class="button is-primary">
                Begin Migration
            </nuxt-link>
        </footer>
    </div>
</template>
