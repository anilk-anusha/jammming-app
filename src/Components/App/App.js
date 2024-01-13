import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Track Name 1",
      artist: "Track Artist 1",
      album: "Track Album 1",
      id: 1,
    },
    {
      name: "Track Name 2",
      artist: "Track Artist 2",
      album: "Track Album 2",
      id: 2,
    },
    {
      name: "Track Name 3",
      artist: "Track Artist 3",
      album: "Track Album 3",
      id: 3,
    },
    {
      name: "Track Name 4",
      artist: "Track Artist 4",
      album: "Track Album 4",
      id: 4,
    },
    {
      name: "Track Name 5",
      artist: "Track Artist 5",
      album: "Track Album 5",
      id: 5,
    },
    {
      name: "Track Name 6",
      artist: "Track Artist 6",
      album: "Track Album 6",
      id: 6,
    },
    {
      name: "Track Name 7",
      artist: "Track Artist 7",
      album: "Track Album 7",
      id: 7,
    },
    {
      name: "Track Name 8",
      artist: "Track Artist 8",
      album: "Track Album 8",
      id: 8,
    },
    {
      name: "Track Name 9",
      artist: "Track Artist 9",
      album: "Track Album 9",
      id: 9,
    },
    {
      name: "Track Name 10",
      artist: "Track Artist 10",
      album: "Track Album 10",
      id: 10,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Playlist Name 1",
      artist: "Playlist Artist 1",
      album: "Playlist Album 1",
      id: 11,
    },
    {
      name: "Playlist Name 2",
      artist: "Playlist Artist 2",
      album: "Playlist Album 2",
      id: 22,
    },
    {
      name: "Playlist Name 3",
      artist: "Playlist Artist 3",
      album: "Playlist Album 3",
      id: 33,
    },
    {
      name: "Playlist Name 4",
      artist: "Playlist Artist 4",
      album: "Playlist Album 4",
      id: 44,
    },
    {
      name: "Playlist Name 5",
      artist: "Playlist Artist 5",
      album: "Playlist Album 5",
      id: 55,
    },
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />

        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* passing searchResults state to the SearchResults component as userSearchResults */}

          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
          {/* passing playlistName & playlistTracks states to the Playlist component as userSearchResults */}
        </div>
      </div>
    </div>
  );
}

export default App;
