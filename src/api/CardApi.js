import AxoisApi from './Api';

export const getUserDetails = (userID, callback) => {
  AxoisApi.post('/detail', {id: userID})
    .then(response => {
      callback(response.data.profile);
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateUserDetails = (updateRequest, callback) => {
  AxoisApi.post('/updatecard', updateRequest)
    .then(response => {
      callback(response.data.error);
    })
    .catch(error => {
      console.log(error);
    });
};
