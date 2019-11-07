<template>
  <div class="card stack channels">
    <section class="primary">
      <div class="flex space-between">
        <h3>Channels</h3>

        <div class="buttons">
          <a class="button">Manage Channels</a>
          <a class="button">Open Channel</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            2
          </div>

          <div class="label">
            Lightning Channels
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            7
          </div>

          <div class="label">
            Autopilot Channels
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            14,600
          </div>

          <div class="label">
            Sats in Lightning
          </div>
        </div>

        <div class="column narrow">
          <div class="big numeric">
            400
          </div>

          <div class="label">
            Sats Pending
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div class="columns">
        <div class="column left">
          <span class="title">Autopilot Channel</span>
          <span class="subtitle">0212864d59d5a902634c4a3186615446e9d56c17b14600f3b74fbabe3509aa707f</span>
        </div>

        <div class="column right">
          <span class="title status active">Online</span>
          <span class="subtitle numeric">
            <strong>Can Send:</strong> 123,000<br>
            <strong>Can Receive:</strong> 1,400
          </span>
        </div>
      </div>

      <div class="columns">
        <div class="column left">
          <span class="title">Autopilot Channel</span>
          <span class="subtitle">0212864d59d5a902634c4a3186615446e9d56c17b14600f3b74fbabe3509aa707f</span>
        </div>

        <div class="column right">
          <span class="title status inactive">Offline</span>
          <span class="subtitle numeric">
            <strong>Can Send:</strong> 23,000<br>
            <strong>Can Receive:</strong> 1,410,000
          </span>
        </div>
      </div>


      <div class="columns">
        <div class="column left">
          <span class="title">Custom Channel</span>
          <span class="subtitle">Hello World!</span>
        </div>

        <div class="column right">
          <span class="title status active">Online</span>
          <span class="subtitle numeric">
            <strong>Can Send:</strong> 1,230,000<br>
            <strong>Can Receive:</strong> 1,400
          </span>
        </div>
      </div>
    </section>

    <section class="foot">
      <a class="button">See All 9 Channels</a>
    </section>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .channels {
    .title.status {
      font-weight: bold;
    }

    .subtitle {
      // Todo: Refactor into min-width so when values get long it doesn't overflow
      strong {
        font-family: $standardFonts;
        color: $white;
        font-size: 14px;
        font-weight: bold;
        position: absolute;
        width: 100px;
        right: 140px;
      }
    }
  }
</style>
