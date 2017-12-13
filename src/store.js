import BE from './BE/BE';
import { forEach, map, cloneDeep, get, filter } from 'lodash';

const { PHOTOS_FOLDER_URL, PHOTOS_MINI_FOLDER_URL, PHOTOS_CLIENT_FOLDER_URL, IMAGES_URL } = require('./constants');

let backgroundPhotoInterval;


export default {
  state: {
    loaded: false,
    backgroundPhotos: [],
    categories: [],
    feedbacks: [],
    photos: [],
    currentPhotoId: parseInt(localStorage.currentPhoto) || 0,
    galleryPhotoIndex: 0,
    paused: false,
    isAuth: false,
  },
  getters: {
    currentPhoto(state) {
      return PHOTOS_FOLDER_URL + state.backgroundPhotos[state.currentPhotoId];
    },
    galleryPhoto(state) {
      return get(state, `categories[0].photos[${state.galleryPhotoIndex}]`) || '';
    }
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories;
    },
    backgroundPhotos (state, backgroundPhotos) {
      state.backgroundPhotos = backgroundPhotos;
    },
    changeBackgroundPhoto(state, displace) {
      function checkPhotoId(id) {
        if (id>state.backgroundPhotos.length-1) id = 0;
        if (id<0) id = state.backgroundPhotos.length-1;
        return id;
      }
      state.currentPhotoId += displace;
      state.currentPhotoId = checkPhotoId(state.currentPhotoId);
      localStorage.currentPhoto = state.currentPhotoId;
    },
    changeGalleryPhoto(state, index) {
      const photos = get(state, 'categories[0].photos') || [];
      const last = photos.length-1;
      if (index<0) index = 0;
      if (index>last) index = last;
      state.galleryPhotoIndex = index;
    },
    setFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
    },
    setPause(state, value) {
      state.paused = value;
    },
    setAuth(state, value) {
      state.isAuth = value;
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setLoaded(state, loaded) {
      state.loaded = loaded;
    }
  },
  actions: {
    loadData(context) {
      return BE.getData().then(data => {
        context.commit('setLoaded', true);
        context.commit('backgroundPhotos', data.bkgPhotos);
        const categories = cloneDeep(data.categories);
        forEach(categories, category => {
          category.miniPhotos = map(category.photos, photo => PHOTOS_MINI_FOLDER_URL+photo);
          category.photosIds = map(category.photos, photo => photo);
          category.photos = map(category.photos, photo => PHOTOS_FOLDER_URL+photo);
        });
        context.commit('categories', categories);
        context.commit('setFeedbacks', map(filter(data.feedbacks, f => f.confirmed), f => ({
          name: f.name,
          photo: f.photo ? PHOTOS_CLIENT_FOLDER_URL + f.photo : IMAGES_URL+'/img-placeholder.png',
          text: f.text
        })));
        return data;
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
      context.commit('setPause', false);
      backgroundPhotoInterval = setInterval(()=> {
        context.dispatch('nextBackgroundPhoto')
      }, 7000);
    },
    pauseBackgroundPresentation(context) {
      clearInterval(backgroundPhotoInterval);
      context.commit('setPause', true);
    },
    resetBackgroundPresentationInterval(context) {
      context.dispatch('pauseBackgroundPresentation');
      context.dispatch('startBackgroundPresentation');
    },
    nextGalleryPhoto(context) {
      context.commit('changeGalleryPhoto', context.state.galleryPhotoIndex+1);
    },
    previousGalleryPhoto(context) {
      context.commit('changeGalleryPhoto', context.state.galleryPhotoIndex-1);
    },
    setGalleryPhoto(context, index) {
      context.commit('changeGalleryPhoto', index);
    },
    sendMessage(context, form) {
      return BE.sendMessage(form);
    },
    leaveFeedback(context, form) {
      return BE.leaveFeedback(form);
    },
    login(context, { username, password }) {
      return BE.login(username, password).then(response => {
        context.commit('setAuth', response.isAuth);
        return response;
      });
    },
    checkAuth(context) {
      return BE.isAuth().then(isAuth => {
        context.commit('setAuth', isAuth);
      });
    },
    loadAllPhotos(context) {
      BE.getPhotos().then(photos => {
        context.commit('setPhotos', photos.reverse());
      });
    },
    uploadPhoto(context, { file, type, crop }) {
      return BE.uploadPhoto(file, type, crop).then(response => {
        if (!response.error) context.dispatch('loadAllPhotos');
        return response;
      });
    },
    deletePhoto(context, id) {
      return BE.deletePhoto(id).then(response => {
        context.dispatch('loadAllPhotos');
        return response;
      });
    },
    addPhotoToGallery(context, { id, order }) {
      return BE.addPhotoToCategory(id, BE.data.categories[0].name, order).then(response => {
        if (!response.error) {
          return context.dispatch('loadData');
        }
        return response;
      });
    },
    deletePhotoFromGallery(context, id) {
      return BE.deletePhotoFromCategory(id, BE.data.categories[0].name).then(response => {
        context.dispatch('loadData');
        return response;
      });
    },
    addPhotoToBkg(context, { id, photoAboveId }) {
      if (photoAboveId) {
        return BE.addPhotoToBkgAbove(id, photoAboveId).then(response => {
          if (!response.error) {
            return context.dispatch('loadData');
          }
          return response;
        });
      } else {
        return BE.addPhotoToBkg(id, photoAboveId).then(response => {
          if (!response.error) {
            return context.dispatch('loadData');
          }
          return response;
        });
      }
    },
    deletePhotoFromBkg(context, id) {
      return BE.removePhotoFromBkg(id).then(response => {
        return context.dispatch('loadData');
      });
    }
  }
};
