const API_DOMAIN = 'http://www.tropina.pro';
const API_URL = API_DOMAIN +'/BE/index.php';
const API_DATA_URL = API_DOMAIN + '/BE/data.json';

const IMAGES_URL = API_DOMAIN+'/images';
const PHOTOS_FOLDER_URL = IMAGES_URL + '/photos/';
const PHOTOS_MINI_FOLDER_URL = IMAGES_URL + '/photos_mini/';
const PHOTOS_CLIENT_FOLDER_URL = IMAGES_URL + '/client_photo/';
const LOGO_IMAGE_URL = API_DOMAIN + '/images/framing.png';

const SERVICE_IFRAME_URL = API_DOMAIN + '/BE/services-info.html';

module.exports = {
  API_DOMAIN,
  API_URL,
  API_DATA_URL,
  IMAGES_URL,
  PHOTOS_FOLDER_URL,
  PHOTOS_MINI_FOLDER_URL,
  PHOTOS_CLIENT_FOLDER_URL,
  LOGO_IMAGE_URL,
  SERVICE_IFRAME_URL
};
