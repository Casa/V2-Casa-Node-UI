<template>
    <div>
        <main>
            <img src="~/assets/icons/adapter.svg">

            <h2>Not, it's time to connect the hard drive cable.</h2>
            <p>This step will enable you to transfer data between the two nodes.</p>
            <br/>
            <br/>

            <span class="pill">Step 1</span>
            <p>Ensure your Casa Node 1 is unplugged.</p>
            <br/>
            <br/>

            <span class="pill">Step 2</span>
            <p>On Casa Node 1, unplug the hard drive cable from the USB port.</p>
            <br/>
            <br/>

            <span class="pill">Step 3</span>
            <p>Plug the cable from the Casa Node 1 into the USB Port on Casa Node 2.</p>
            <br/>
            <br/>
        </main>

        <footer>
            <nuxt-link to="/migration/prepare" class="button">
                Go Back
            </nuxt-link>
            <nuxt-link to="/migration/migrating" class="button is-primary">
                Begin Migration
            </nuxt-link>
        </footer>
    </div>
</template>

<style lang="scss">
    @import "~/assets/css/variables.scss";

    .pill {
        text-transform: uppercase;
        background-color: $yellow;
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
