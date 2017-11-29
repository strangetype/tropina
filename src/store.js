import BE from './BE/BE';
import { forEach, map, cloneDeep, get } from 'lodash';

const { PHOTOS_FOLDER_URL, PHOTOS_MINI_FOLDER_URL } = require('./constants');

let backgroundPhotoInterval;


export default {
  state: {
    backgroundPhotos: [],
    categories: [],
    currentPhotoId: parseInt(localStorage.currentPhoto) || 0,
    galleryPhotoIndex: 0
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
    }
  },
  actions: {
    loadData(context) {
      BE.getData().then(data=> {
        context.commit('backgroundPhotos', data.bkgPhotos);
        const categories = cloneDeep(data.categories);
        forEach(categories, category => {
          category.miniPhotos = map(category.photos, photo => PHOTOS_MINI_FOLDER_URL+photo);
          category.photos = map(category.photos, photo => PHOTOS_FOLDER_URL+photo);
        });
        context.commit('categories', categories);
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
    },
    nextGalleryPhoto(context) {
      context.commit('changeGalleryPhoto', context.state.galleryPhotoIndex+1);
    },
    previousGalleryPhoto(context) {
      context.commit('changeGalleryPhoto', context.state.galleryPhotoIndex-1);
    },
    setGalleryPhoto(context, index) {
      context.commit('changeGalleryPhoto', index);
    }
  }
};
