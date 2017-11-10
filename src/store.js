import BE from './BE/BE';

const { PHOTOS_FOLDER_URL } = require('./constants');

let backgroundPhotoInterval;

export default {
  state: {
    data: {},
    photos: [],
    currentPhotoId: 0,
  },
  getters: {
    currentPhoto(state) {
      return PHOTOS_FOLDER_URL + state.photos[state.currentPhotoId];
    },
  },
  mutations: {
    getPhotos (state, photos) {
      state.photos = photos;
    },
    changeBackgroundPhoto(state, displace) {
      function checkPhotoId(id) {
        if (id>state.photos.length-1) id = 0;
        if (id<0) id = state.photos.length-1;
        return id;
      }
      state.currentPhotoId += displace;
      state.currentPhotoId = checkPhotoId(state.currentPhotoId);
    }
  },
  actions: {
    getPhotos(context) {
      BE.getPhotos().then( photos => {
        context.commit('getPhotos', photos);
      });
    },
    nextBackgroundPhoto(context) {
      context.dispatch('resetBackgroundPresentationInterval');
      context.commit('changeBackgroundPhoto', 1);
    },
    prevBackgroundPhoto(context) {
      context.dispatch('resetBackgroundPresentationInterval');
      context.commit('changeBackgroundPhoto', -1);
    },
    startBackgroundPresentation(context) {
      backgroundPhotoInterval = setInterval(()=> {
        context.dispatch('nextBackgroundPhoto')
      }, 7000);
    },
    pauseBackgroundPresentation(context) {
      clearInterval(backgroundPhotoInterval);
    },
    resetBackgroundPresentationInterval(context) {
      context.dispatch('pauseBackgroundPresentation');
      context.dispatch('startBackgroundPresentation');
    }
  }
};
