<template>
  <div class="episode__actions" v-if="$auth.loggedIn">
    <button
      class="episode__action-button"
      @click="downloadEpisode"
      v-if="!isCurrentEpisodeDownloaded"
    >
      <ui-icon name="download" />
    </button>
    <div class="episode__action-button" v-else>
      <ui-icon name="check2" />
    </div>

    <button
      v-if="!isCurrentEpisodeLiked"
      class="episode__action-button"
      @click="likeEpisode"
    >
      <ui-icon name="heart" />
    </button>
    <button class="episode__action-button" @click="unlikeEpisode" v-else>
      <ui-icon name="heart-fill" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    useCurrentEpisode: {
      type: Boolean,
      required: false,
      default: false,
    },
    episode: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      currentEpisode: 'player/currentEpisode',
      isEpisodeDownloaded: 'downloader/isEpisodeDownloaded',
      isEpisodeLiked: 'usermeta/isEpisodeLiked',
    }),
    episodeToUse() {
      return this.useCurrentEpisode ? this.currentEpisode : this.episode;
    },
    isCurrentEpisodeDownloaded() {
      return this.isEpisodeDownloaded(this.episodeToUse.id);
    },
    isCurrentEpisodeLiked() {
      return this.isEpisodeLiked(this.episodeToUse.id);
    },
  },
  methods: {
    downloadEpisode() {
      this.$store.dispatch('downloader/downloadEpisode', this.episodeToUse);
      this.$store.commit('player/SET_MOBILE_PLAYER', false);
      this.$router.push('/downloads');
    },
    async likeEpisode() {
      const likedEpisode = await this.$api.likeEpisode(this.episodeToUse.id);
      this.$store.commit('usermeta/SET_LIKED_EPISODE', likedEpisode);
    },
    async unlikeEpisode() {
      await this.$api.unlikeEpisode(this.episodeToUse.id);
      this.$store.commit('usermeta/REMOVE_LIKED_EPISODE', this.episodeToUse.id);
    },
  },
};
</script>

<style scoped>
.episode__actions {
  @apply flex items-center;
}

.episode__action-button {
  @apply ml-4;
}
</style>
