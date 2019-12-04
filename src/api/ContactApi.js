import AxoisApi from './Api';

export const getContacts = (userID, callback) => {
  AxoisApi.get(`/friend/${userID}`)
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};
