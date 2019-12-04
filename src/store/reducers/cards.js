import {INITIALIZE_CARDS_STORE} from '../actions/cards';

const initialState = {
  userDetails: {
    id: null,
    name: null,
    email: null,
    user_id: null,
    address: null,
    country: null,
    city: null,
    designation: null,
    postalcode: null,
    company_id: null,
    company_name: null,
    industry_id: null,
    telephone1_country: '65',
    telephone: null,
    telephone2: null,
    telephone2_country: '65',
    office_phone_ext: null,
    mb_country: 65,
    mobilephone: '81234567',
    facebook: null,
    twitter: null,
    instagram: null,
    linkedin: null,
    youtube: null,
    website: null,
    googlemaps: null,
    avatar: null,
    barcode_img: null,
    barcode_link: null,
    icon: null,
    namecard: null,
    portfolio: null,
    profile_id: null,
    status: null,
    video: null,
    base64: null,
  },
};

// Update state information after edit + send post request
const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CARDS_STORE:
      return {...state, userDetails: action.card};
    default:
      return state;
  }
};

export default cardsReducer;
