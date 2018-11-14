import { RESTDataSource } from "apollo-datasource-rest";

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.authorization);
  }

  async getCurrentUser() {
    return this.get(`me`);
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  async getCurrentUserPlaylists() {
    const result = await this.get(`me/playlists`);
    return result.items;
  }

  async getUserPlaylists(id) {
    const result = this.get(`users/${id}/playlists`);
    return result.items;
  }

  async getPlaylistCoverImages(id) {
    return this.get(`playlists/${id}/images`);
  }

  async getPlaylistTracks(id) {
    const result = await this.get(`playlists/${id}/tracks`);
    return result.items;
  }

  async getAlbum(id) {
    return this.get(`albums/${id}`);
  }

  async getAlbums(ids) {
    return this.get(`albums/?ids=${ids}`);
  }

  async getAlbumTracks(id) {
    return this.get(`albums/${id}/tracks`);
  }

  async getArtist(id) {
    return this.get(`artists/${id}`);
  }

  async getArtists(ids) {
    return this.get(`artists/?ids=${ids}`);
  }

  async getArtistAlbums(id) {
    return this.get(`artists/${id}/albums`);
  }

  async getArtistTopTracks(id) {
    const result = await this.get(
      `artists/${id}/top-tracks?country=from_token`
    );
    return result.tracks;
  }

  async getArtistRelatedArtists(id) {
    const result = await this.get(`artists/${id}:related-artists`);
    return result.artists;
  }

  async getTrack(id) {
    return this.get(`tracks/${id}`);
  }

  async getTracks(ids) {
    return this.get(`tracks/?ids=${ids}`);
  }

  async getTrackAudioAnalysis(id) {
    return this.get(`audio-analysis/${id}`);
  }

  async getTrackAudioFeatures(id) {
    return this.get(`audio-features/${id}`);
  }

  async getTracksAudioFeatures(ids) {
    return this.get(`audio-features/?ids=${ids}`);
  }

  async search(queryParam, typeParam) {
    const result = await this.get(`search?q=${queryParam}&type=${typeParam}`);
    return Object.values(result).reduce(
      (acc, types) => [...acc, ...types.items],
      []
    );
  }

  async getCategory(id) {
    return this.get(`browse/categories/?id=${id}`);
  }

  async getCategoryPlaylists(id) {
    const result = await this.get(`browse/categories/?id=${id}/playlists`);
    return result.items;
  }

  async browseCategories() {
    const result = await this.get(`browse/categories`);
    return result.categories.items;
  }

  async browseNewReleases() {
    const result = await this.get(`browse/new-releases`);
    return result.albums.items;
  }

  async getRecommendations(seedTracks, seedArtists) {
    return this.get(
      `recommendations/?seed_artists=${seedArtists}&seed_tracks=&${seedTracks}`
    );
  }

  async getCurrentUserPlayback() {
    return this.get(`me/player`);
  }

  async getCurrentPlayerDevices() {
    const result = await this.get(`me/player/devices`);
    return result.devices;
  }

  async getCurrentPlayerPlayedTracks() {
    const result = await this.get(`me/player/devices`);
    return result.items;
  }

  async getCurrentUserPlayingTrack() {
    return this.get(`me/player/currently-playing`);
  }

  async toggleShuffleForCurrentPlayback(state) {
    return this.put(`me/player/shuffle?state=${state}`);
  }

  async startOrResumeCurrentPlayback() {
    return this.put(`me/player/play`);
  }

  async setRepeatModeForCurrentPlayback(state) {
    return this.put(`me/player/repeat?state=${state}`);
  }

  async pauseCurrentPlayback() {
    return this.put(`me/player/pause`);
  }

  async seekToPositionInCurrentlyPlayingTrack(position) {
    return this.put(`me/player/seek?position=${position}`);
  }

  async setVolumeForCurrentPlayback(volume) {
    return this.put(`me/player/volume?volume_percent=${volume}`);
  }

  async SkipCurrentPlaybackToNextTrack() {
    return this.post(`me/player/next`);
  }

  async SkipCurrentPlaybackToPreviousTrack() {
    return this.post(`me/player/previous`);
  }
}
