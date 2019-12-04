import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const BASE_AVATAR_URL = 'https://solucardz.com/assets/images/Avatar/';
const ImageDetailsForm = ({states}) => {
  const [photo, setPhoto] = useState(BASE_AVATAR_URL + states.avatar.state);
  const [base64, setBase64] = useState(states.base64.state);

  const changeImage = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
      } else {
        setBase64(response.data);
        setPhoto(response.uri);
        states.avatar.function(response.uri);
        states.base64.function(response.data);
      }
    });
  };

  return (
    <View style={styles.mainContainerStyle}>
      <Text style={styles.textStyle}>1. Profile Picture</Text>
      <TouchableOpacity onPress={changeImage}>
        <Image
          style={styles.imageStyle}
          source={
            photo
              ? {
                  uri: photo,
                }
              : require('../../../assets/images/blank-profile-picture.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    paddingTop: 20,
    marginLeft: 10,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  imageStyle: {
    backgroundColor: 'rgb(125,132,148)',
    resizeMode: 'stretch',
    width: 120,
    height: 120,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
  },
});

export default ImageDetailsForm;
