import BE from './BE/BE';

const PHOTOS_FOLDER_URL = 'http://www.tropina.pro/images/photos/';

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
    nextBackgroundPhoto(state) {
      function checkPhotoId(id) {
        if (id>state.photos.length-1) id = 0;
        if (id<0) id = state.photos.length-1;
        return id;
      }
      state.currentPhotoId++;
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
      context.commit('nextBackgroundPhoto');
    }
  }
};
