import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchPlaylists(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
      console.log('fetch playlist');
      
      const playlistsData = yield axios.get(`api/playlist/`)
        // add track to the currently playing tracklist 
      yield put({
          type: "SET_ALL_PLAYLISTS", 
          payload: playlistsData.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch playlists!',error);
      alert('Failed to Load your playlist information! Please try again.')
    }
  }

  function* createPlaylist(action) {
    try {
      console.log(action.payload);
      
        yield axios.post('/api/playlist', action.payload)
        yield put({
            type: "FETCH_PLAYLISTS"
        })
    } catch (error) {
        console.log(error);
    }
}
function* AddToPlaylist(action) {

    /**
     *  {
          trackID: track_id,
          playlistID: playlist_id
      }
     */
    try {
      console.log(action.payload);
      
      yield axios.post(`/api/playlist/${action.payload.playlistID}/${action.payload.trackID}`)
      // add alert to user that it was added
    } catch (error) {
      console.log(error);
    }
}
function* removeFromPlaylist(action) {
      try {
        yield axios.delete(`/api/playlist/${action.payload.playlistID}/${action.payload.trackID}`)
        yield put({type: "FETCH_PLAYLIST_DETAILS", payload: {id: action.payload.playlistID}})
      } catch (error) {
        console.log(error);
      }
}
function* EditPlaylistName(action) {
    try {
      yield axios.put(`/api/playlist/edit/${action.payload.playlistID}/${action.payload.playlistName}`)
      yield put({
        type: "FETCH_PLAYLIST_DETAILS",
        payload: {id: action.payload.playlistID}
      })
    } catch (error) {
      console.log(error);
    }
}

  function* PlaylistsSaga() {
      yield takeLatest('FETCH_PLAYLISTS', fetchPlaylists)
      yield takeEvery('CREATE_PLAYLIST', createPlaylist)
      yield takeEvery('ADD_TOO_PLAYLIST', AddToPlaylist)
      yield takeEvery('REMOVE_FROM_PLAYLIST', removeFromPlaylist)
      yield takeLatest('EDIT_PLAYLIST_NAME', EditPlaylistName)
    }
  
  export default PlaylistsSaga;