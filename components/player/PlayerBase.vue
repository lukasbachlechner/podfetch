<template>
  <div>
    <aside
      v-if="currentEpisode"
      class="player__wrapper"
      :class="{ 'player--open': playerOpen }"
    >
      <div class="player__header">
        <p class="player__header-text">Now playing</p>
        <div class="player__header-close-container">
          <button class="player__close" @click.stop="closePlayer">
            <ui-icon name="chevron-down" />
          </button>
        </div>
      </div>
      <div class="player__image">
        <ui-image v-show="!isEpisodeLoading" :src="currentEpisode.image" />
        <loading-spinner v-show="isEpisodeLoading" />
      </div>
      <div class="player__info">
        <nuxt-link
          :to="`/episode/${currentEpisode.titleSlug}/${currentEpisode.id}`"
          class="player__episode ellipsis"
          >{{ currentEpisode.title }}</nuxt-link
        >
        <nuxt-link
          :to="`/podcast/${currentEpisode.podcastTitleSlug}/${currentEpisode.podcastId}`"
          class="player__podcast"
          >{{ currentEpisode.podcastTitle }}</nuxt-link
        >
      </div>

      <player-controls
        @toggle-playback="toggleAudio"
        @skip-forward="handleSkipForward"
        @skip-backward="handleSkipBackward"
      />
      <player-track
        ref="playerTrack"
        :max="duration"
        @track-input="handleRangeInput"
        @track-change="handleRangeChange"
      />
      <player-actions />

      <audio
        ref="player"
        :autoplay="isSafariIOS"
        :src="currentEpisode.audioUrl"
        :type="currentEpisode.audioType"
        class="hidden"
        @loadedmetadata="displayMetadata"
        @loadeddata="handleAudioLoaded"
        @ended="handlePlaybackEnded"
        @stalled="handleStalled"
      ></audio>

      <button class="player__open-button" @click="openPlayer">
        <span class="sr-only">Open Player</span>
      </button>
    </aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    duration: 0,
    interval: null,
  }),
  computed: {
    ...mapGetters({
      currentEpisode: 'player/currentEpisode',
      playerOpen: 'player/mobilePlayerOpen',
      hasEpisode: 'player/hasEpisode',
      isLastPlayedEpisode: 'player/isLastPlayedEpisode',
      lastPlaybackTime: 'player/lastPlaybackTime',
      isEpisodeDownloaded: 'downloader/isEpisodeDownloaded',
      isEpisodeLoading: 'player/episodeLoading',
      isSafariIOS: 'isSafariIOS',
    }),
    isCurrentEpisodeDownloaded() {
      return this.isEpisodeDownloaded(this.currentEpisode.id);
    },
  },
  watch: {
    currentEpisode(newEpisode) {
      if (newEpisode === null) {
        this.stopInterval();
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('player/getLastPlayedEpisode');
  },
  methods: {
    openPlayer() {
      if (!this.playerOpen) {
        this.$store.commit('player/SET_MOBILE_PLAYER', true);
      }
    },
    closePlayer() {
      if (this.playerOpen) {
        this.$store.commit('player/SET_MOBILE_PLAYER', false);
      }
    },
    playAudio() {
      const { player } = this.$refs;
      player.play();
      this.$store.commit('player/SET_PLAYING');
      this.setCurrentTime();
      this.startInterval();
    },
    pauseAudio() {
      this.$store.commit('player/SET_PLAYING', false);
      const { player } = this.$refs;
      player.pause();
      this.stopInterval();
    },
    startInterval() {
      this.interval = setInterval(this.setCurrentTime, 1000);
    },
    stopInterval() {
      clearInterval(this.interval);
    },
    toggleAudio() {
      const { player } = this.$refs;
      if (player?.paused) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    },
    displayMetadata() {
      const { player } = this.$refs;
      this.duration = Math.floor(player.duration);
      this.$store.commit('player/SET_DURATION', player.duration);
    },
    handleRangeInput(value) {
      const { player } = this.$refs;
      this.$store.commit('player/SET_CURRENT_TIME', value);
      if (!player.paused) {
        this.stopInterval();
      }
    },
    handleRangeChange(value) {
      const { player } = this.$refs;
      this.setCurrentTime(value);
      if (!player.paused) {
        this.startInterval();
      }
    },
    handlePlaybackEnded() {
      const { playerTrack } = this.$refs;
      playerTrack.setValue(0);
      this.$store.commit('player/SET_CURRENT_TIME', 0);
      this.$store.commit('player/SET_PLAYING', false);
      this.stopInterval();
    },
    handleAudioLoaded() {
      this.$store.commit('player/SET_EPISODE_LOADING', false);

      if (!this.isLastPlayedEpisode) {
        this.playAudio();
      } else {
        this.setCurrentTime(this.lastPlaybackTime);
      }
    },
    setCurrentTime(value) {
      const { player, playerTrack } = this.$refs;

      value = value ?? player?.currentTime;

      const roundedValue = Math.round(value);
      const roundedCurrentTime = Math.round(player?.currentTime);
      playerTrack?.setValue(roundedValue);

      if (roundedValue !== roundedCurrentTime) {
        player.currentTime = roundedValue;
      }
      this.$store.commit('player/SET_CURRENT_TIME', roundedValue);
      this.$api.setLastPlaybackTime(
        this.currentEpisode.id,
        this.currentEpisode,
        roundedValue
      );
    },
    handleSkipForward() {
      const { player } = this.$refs;

      this.setCurrentTime(player?.currentTime + 15);
    },

    handleSkipBackward() {
      const { player } = this.$refs;

      this.setCurrentTime(player?.currentTime - 15);
    },
    handleStalled() {
      console.log('playback stalled');
    },
  },
};
</script>

<style scoped>
.player__wrapper {
  @apply w-full bg-haiti-high px-4 py-3 flex items-center relative select-none;
  @apply md:fixed md:bottom-0 md:left-0;
}

.player__image {
  @apply w-14 h-14 rounded bg-white bg-opacity-5 flex-shrink-0 mr-4 flex items-center justify-center;
}

.player__info {
  @apply flex flex-col overflow-hidden relative z-50;
  @apply md:w-36 md:mr-4;
}

.player__episode {
  @apply font-bold ellipsis;
}

.player__podcast {
  @apply text-sm opacity-50 whitespace-nowrap overflow-hidden overflow-ellipsis inline-block;
}

.player__header {
  @apply hidden;
}

.player__open-button {
  @apply absolute left-0 top-0 w-full h-full md:hidden;
}

@screen max-md {
  .player--open {
    @apply fixed top-8 p-8 bottom-0 flex-col gap-0 items-start bg-haiti-high rounded-t-2xl;
  }

  .player--open .player__open-button {
    @apply hidden;
  }

  .player--open .player__image {
    @apply w-full h-auto mx-auto mb-4 bg-transparent;
  }

  .player--open .player__info {
    @apply w-full mb-4;
  }

  .player--open >>> .player__track {
    @apply flex w-full flex-wrap justify-between flex-grow-0 my-4;
  }

  .player--open >>> .player__track-time {
    @apply order-2 mt-4;
  }

  .player--open >>> .player__controls {
    @apply order-2 justify-center ml-0 w-full;
  }

  .player--open >>> .player__play-button {
    @apply flex-grow-0 w-16 h-16 mx-8;
  }

  .player--open >>> .player__skip-button {
    @apply block;
  }

  .player--open >>> .player__skip-button svg {
    @apply w-8 h-8;
  }

  .player--open >>> .player__play-button svg {
    @apply h-10 w-10;
  }

  .player--open .player__header {
    @apply w-full grid grid-cols-3 items-center mb-4;
  }

  .player--open >>> .player__actions {
    @apply flex order-3 mt-12 mx-0 justify-center w-full;
  }

  .player--open >>> .episode__action-button:first-of-type {
    @apply ml-0;
  }

  .player--open >>> .episode__action-button {
    @apply ml-8;
  }

  .player--open >>> .episode__action-button svg {
    @apply h-6 w-6;
  }

  .player__header-text {
    @apply col-start-2 text-center opacity-50;
  }

  .player__header-close-container {
    @apply flex justify-end;
  }

  .player__close {
    @apply rounded-full bg-white bg-opacity-10 flex items-center justify-center w-8 h-8 justify-self-center;
  }

  .player__close .icon__container {
    @apply mt-1;
  }
}
</style>
