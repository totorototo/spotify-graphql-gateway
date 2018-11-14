import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  union Result = Artist | Album | Playlist | Track

  union Items =
      SimplifiedAlbum
    | SimplifiedArtist
    | SimplifiedPlaylist
    | SimplifiedTrack

  type Album {
    type: String!
    album_type: String!
    available_markets: [String]!
    genres: [String]!
    href: String!
    id: String!
    images: [Image]!
    label: String
    name: String!
    release_date_precision: String!
    release_date: String!
    uri: String!
    external_urls: ExternalUrls!
    artists: [Artist]!
    copyright: [Copyright]!
    tracks: [Track]!
  }

  type SimplifiedAlbum {
    album_group: String!
    album_type: String!
    artists: [SimplifiedArtist]!
    available_markets: [String]!
    external_urls: ExternalUrls!
    href: String!
    id: String!
    images: [Image]!
    name: String!
    release_date_precision: String!
    release_date: String!
    type: String!
    uri: String!
  }

  type SimplifiedArtist {
    external_urls: ExternalUrls!
    href: String!
    id: String!
    name: String!
    type: String!
    uri: String!
  }

  type Playlist {
    type: String!
    collaborative: Boolean!
    description: String!
    href: String!
    id: String!
    images: [Image]!
    name: String!
    public: Boolean!
    snapshot_id: String!
    uri: String!
    owner: User!
    external_urls: ExternalUrls!
    followers: Followers!
    tracks: Paging!
  }

  type SimplifiedPlaylist {
    collaborative: Boolean!
    external_urls: ExternalUrls!
    href: String!
    id: String!
    images: [Image]!
    name: String!
    owner: User!
    public: Boolean!
    snapshot_id: String!
    tracks: [Track]!
    type: String!
    uri: String!
  }

  type PlaylistTrack {
    added_at: String!
    added_by: User!
    is_local: Boolean!
    track: Track!
  }

  type RecommendationsSeed {
    afterFilteringSize: Int!
    afterRelinkingSize: Int!
    href: String!
    initialPoolSize: Int!
    type: String!
  }

  type Recommendations {
    tracks: [SimplifiedTrack]!
    seeds: [RecommendationsSeed]!
  }

  type SavedTrack {
    added_at: String!
    track: Track!
  }

  type SavedAlbum {
    added_at: String!
    album: Album!
  }

  type Track {
    type: String!
    album: SimplifiedAlbum!
    artist: [SimplifiedArtist]!
    available_markets: [String]!
    disc_number: Int!
    duration_ms: Int!
    explicit: Boolean!
    external_urls: ExternalUrls!
    href: String!
    id: String!
    is_playable: Boolean!
    name: String!
    popularity: Int!
    preview_url: String!
    track_number: Int!
    uri: String!
    link_from: TrackLink!
  }

  type TrackLink {
    external_urls: ExternalUrls!
    href: String!
    id: String!
    type: String!
    uri: String!
  }

  type ExternalUrls {
    spotify: String!
  }

  type Followers {
    href: String
    total: Int!
  }

  type Image {
    width: Int!
    height: Int!
    url: String!
  }

  type Paging {
    href: String!
    items: [Items]!
    limit: Int!
    next: String!
    offset: Int!
    previous: String!
    total: Int!
  }

  type CursorBasedPaging {
    href: String!
    items: [Result]!
    limit: Int!
    next: String!
    cursors: Cursor!
    total: Int!
  }

  type PlayHistory {
    track: SimplifiedTrack!
    played_at: String!
    context: Context!
  }

  type SimplifiedTrack {
    id: String!
    artists: [SimplifiedArtist]!
    available_markets: [String]!
    disc_number: Int!
    duration_ms: Int!
    explicit: Boolean!
    external_urls: ExternalUrls!
    href: String!
    is_playable: Boolean!
    link_from: TrackLink!
    name: String!
    preview_url: String!
    track_number: Int!
    type: String!
    uri: String!
    is_local: Boolean!
  }

  type Artist {
    href: String!
    id: String!
    external_urls: ExternalUrls!
    genres: [String]!
    images: [Image]!
    followers: Followers!
    popularity: Int!
    type: String!
    uri: String!
    name: String!
  }

  type User {
    id: String!
    display_name: String!
    href: String!
    images: [Image]!
    type: String!
    uri: String!
    external_urls: ExternalUrls!
    followers: Followers!
  }

  type PrivateUser {
    birthdate: String
    country: String!
    display_name: String
    email: String
    external_urls: ExternalUrls!
    followers: Followers!
    href: String!
    id: String!
    images: [Image]
    product: String!
    type: String!
    uri: String!
  }

  type AudioFeature {
    acousticness: Float!
    analysis_url: String!
    danceability: Float!
    duration_ms: Int!
    energy: Float!
    id: String!
    instrumentalness: Float!
    key: Int!
    liveness: Float!
    loudness: Float!
    mode: Int!
    speechness: Float!
    tempo: Float!
    time_signature: Int!
    track_href: String!
    type: String!
    uri: String!
    valence: Float!
  }

  type Category {
    href: String!
    icons: [Image]!
    id: String!
    name: String!
  }

  type Context {
    type: String!
    href: String!
    external_urls: ExternalUrls!
    uri: String!
  }

  type CurrentlyPlayingContext {
    device: Device!
    repeat_state: String!
    shuffle_state: Boolean!
    context: Context
    timestamp: Int!
    progress_ms: Int!
    is_playing: Boolean!
    currently_playing_type: String!
  }

  type Copyright {
    text: String!
    type: String!
  }

  type Cursor {
    after: String!
  }

  type Error {
    status: String!
    message: String!
  }

  type AudioAnalysis {
    beats: [Beat]!
    bars: [Bar]!
    meta: Meta!
    sections: [Section]!
    segments: [Segment]!
    tantums: [Tantum]!
    track: AnalysedTrack!
  }

  type AnalysedTrack {
    duration: Float!
    sample_md5: String!
    offset_seconds: Int!
    window_seconds: Int!
    analysis_sample_rate: Int!
    analysis_channels: Int!
    end_of_fade_in: Int!
    start_of_fade_out: Float!
    loudness: Float!
    tempo: Float!
    tempo_confidence: Float!
    time_signature: Int!
    time_signature_confidence: Int!
    key: Int!
    key_confidence: Float!
    mode: Int!
    mode_confidence: Float!
    codestring: String!
    code_version: Float!
    echoprintstring: String!
    echoprint_version: Float!
    synchstring: String!
    synch_version: Int!
    rhythmstring: String!
    rhythm_version: Int!
  }

  type Section {
    start: Float!
    duration: Float!
    confidence: Int!
    loudness: Float!
    tempo: Float!
    tempo_confidence: Float!
    key: Int!
    key_confidence: Float!
    mode: Int!
    mode_confidence: Float!
    time_signature: Int!
    time_signature_confidence: Int!
  }

  type Segment {
    start: Float!
    timbre: [Float]!
    pitch: [Float]!
    loudness_start: Float!
    loudness_max_time: Float!
    loudness_max: Float!
    loudness_end: Int!
  }

  type Tantum {
    start: Float!
    duration: Float!
    confidence: Float!
  }

  type Beat {
    start: Float!
    duration: Float!
    confidence: Float!
  }

  type Bar {
    start: Float!
    duration: Float!
    confidence: Float!
  }

  type Meta {
    analyzer_version: String!
    platform: String!
    detailed_status: String!
    status_code: Int!
    timestamp: Int!
    analysis_time: Float!
    input_process: String!
  }

  type Device {
    id: String!
    is_active: Boolean!
    is_private_session: Boolean!
    is_restricted: Boolean!
    name: String!
    type: String!
    volume_percent: Int!
  }

  type CurrentlyPlaying {
    context: Context
    timestamp: Int!
    progress_ms: Int!
    is_playing: Boolean!
    item: Track!
    currently_playing_type: String!
  }

  type Query {
    getCategory(id: String!): Category!
    getCategoryPlaylists(id: String!): [SimplifiedPlaylist]!
    browseCategories: [Category]!
    browseNewReleases: [SimplifiedAlbum]!
    getCurrentUser: PrivateUser!
    getUser(id: String!): User!
    getCurrentUserPlaylists: [SimplifiedPlaylist]!
    getUserPlaylists(id: String!): [SimplifiedPlaylist]!
    getPlaylistCoverImages(id: String!): [Image]!
    getPlaylistTracks(id: String!): [SimplifiedTrack]!
    getAlbum(id: String!): Album
    getAlbums(ids: String!): [Album]
    getAlbumTracks(id: String!): [SimplifiedTrack]!
    getArtist(id: String!): Artist!
    getArtists(ids: String!): [Artist]!
    getArtistAlbums(id: String!): [SimplifiedAlbum]!
    getArtistTopTracks(id: String!): [Track]!
    getArtistRelatedArtists(id: String!): [Artist]!
    getTrack(id: String!): Track!
    getTracks(ids: String!): [Track]!
    getTrackAudioAnalysis(id: String!): AudioAnalysis!
    getTrackAudioFeatures(id: String!): AudioFeature!
    getTracksAudioFeatures(ids: String!): [AudioFeature]!
    search(queryParam: String!, typeParam: String!): [Result]
    getRecommendations(
      seedTracks: String!
      seedArtisits: String!
    ): Recommendations!
    getCurrentUserPlayback: CurrentlyPlayingContext!
    getCurrentPlayerDevices: [Device]!
    getCurrentPlayerPlayedTracks: [PlayHistory]!
    getCurrentUserPlayingTrack: CurrentlyPlaying!
  }
  type Mutation {
    pauseCurrentPlayback: String
    toggleShuffleForCurrentPlayback(state: Boolean!): String
    setRepeatModeForCurrentPlayback(state: String!): String
    startOrResumeCurrentPlayback: String
    seekToPositionInCurrentlyPlayingTrack(position: Int!): String
    setVolumeForCurrentPlayback(volume: Int!): String
    SkipCurrentPlaybackToNextTrack: String
    SkipCurrentPlaybackToPreviousTrack: String
  }
  type Subscription {
    CurrentPlaybackTrackSkippedToNext: String
    CurrentPlaybackTrackSkippedToPrevious: String
  }
`;

export default typeDefs;
