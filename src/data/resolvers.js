import { PubSub } from "apollo-server";

const pubsub = new PubSub();

const SKIPPED_TO_NEXT = "SKIPPED_TO_NEXT";
const SKIPPED_TO_PREVIOUS = "SKIPPED_TO_PREVIOUS";

const resolvers = {
  Result: {
    __resolveType(obj) {
      if (obj.type === "artist") {
        return "Artist";
      }

      if (obj.type === "album") {
        return "Album";
      }

      if (obj.type === "track") {
        return "Track";
      }

      if (obj.type === "playlist") {
        return "Playlist";
      }

      return null;
    }
  },
  Items: {
    __resolveType(obj) {
      if (obj.type === "artist") {
        return "SimplifiedArtist";
      }

      if (obj.type === "album") {
        return "SimplifiedAlbum";
      }

      if (obj.type === "track") {
        return "SimplifiedTrack";
      }

      if (obj.type === "playlist") {
        return "SimplifiedPlaylist";
      }

      return null;
    }
  },
  Query: {
    getCurrentUser: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser(),

    getUser: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getUser(_args.id),

    getCurrentUserPlaylists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserPlaylists(),

    getUserPlaylists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getUserPlaylists(_args.id),

    getPlaylistCoverImages: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getPlaylistCoverImages(_args.id),

    getPlaylistTracks: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getPlaylistTracks(_args.id),

    getAlbum: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbum(_args.id),

    getAlbums: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbums(_args.ids),

    getAlbumTracks: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbumTracks(_args.ids),

    getArtist: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtist(_args.id),

    getArtists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtists(_args.ids),

    getArtistAlbums: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtistAlbums(_args.id),

    getArtistTopTracks: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtistTopTracks(_args.id),

    getArtistRelatedArtists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtistRelatedArtists(_args.id),

    getTrack: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getTrack(_args.id),

    getTracks: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getTracks(_args.ids),

    getTrackAudioAnalysis: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getTrackAudioAnalysis(_args.id),

    getTrackAudioFeatures: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getTrackAudioFeatures(_args.id),

    getTracksAudioFeatures: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getTracksAudioFeatures(_args.ids),

    search: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.search(_args.queryParam, _args.typeParam),
    getCategory: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCategory(_args.id),
    getCategoryPlaylists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCategoryPlaylists(_args.ids),
    browseCategories: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.browseCategories(),
    browseNewReleases: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.browseNewReleases(),

    getRecommendations: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getRecommendations(
        _args.seedTracks,
        _args.seedArtisits
      ),
    getCurrentUserPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserPlayback(),
    getCurrentPlayerDevices: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentPlayerDevices(),
    getCurrentPlayerPlayedTracks: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentPlayerPlayedTracks(),
    getCurrentUserPlayingTrack: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserPlayingTrack()
  },
  Mutation: {
    pauseCurrentPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.pauseCurrentPlayback(),
    toggleShuffleForCurrentPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.toggleShuffleForCurrentPlayback(_args.state),
    startOrResumeCurrentPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.startOrResumeCurrentPlayback(),
    setRepeatModeForCurrentPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.setRepeatModeForCurrentPlayback(_args.state),
    seekToPositionInCurrentlyPlayingTrack: async (
      _source,
      _args,
      { dataSources }
    ) =>
      dataSources.spotifyAPI.seekToPositionInCurrentlyPlayingTrack(
        _args.position
      ),
    setVolumeForCurrentPlayback: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.setVolumeForCurrentPlayback(_args.volume),
    SkipCurrentPlaybackToPreviousTrack: async (
      _source,
      _args,
      { dataSources }
    ) => {
      const result = await dataSources.spotifyAPI.SkipCurrentPlaybackToPreviousTrack();
      await pubsub.publish(SKIPPED_TO_PREVIOUS, { result });
      return result;
    },

    SkipCurrentPlaybackToNextTrack: async (_source, _args, { dataSources }) => {
      const result = await dataSources.spotifyAPI.SkipCurrentPlaybackToNextTrack();
      await pubsub.publish(SKIPPED_TO_NEXT, { result });
      return result;
    }
  },
  Subscription: {
    CurrentPlaybackTrackSkippedToNext: {
      subscribe: () => pubsub.asyncIterator([SKIPPED_TO_NEXT])
    },
    CurrentPlaybackTrackSkippedToPrevious: {
      subscribe: () => pubsub.asyncIterator([SKIPPED_TO_PREVIOUS])
    }
  }
};

export default resolvers;
