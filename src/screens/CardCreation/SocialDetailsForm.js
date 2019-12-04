import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SocialFormInput from '../../components/SocialFormInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SocialDetailsForm = ({states}) => {
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <SocialFormInput
        iconName="facebook-box"
        placeHolder="Facebook"
        defaultValue={states.facebook.state}
        setInput={states.facebook.function}
      />
      <SocialFormInput
        iconName="twitter"
        placeHolder="Twitter"
        defaultValue={states.twitter.state}
        setInput={states.twitter.function}
      />
      <SocialFormInput
        iconName="instagram"
        placeHolder="Instagram"
        defaultValue={states.instagram.state}
        setInput={states.instagram.function}
      />
      <SocialFormInput
        iconName="linkedin-box"
        placeHolder="LinkedIn"
        defaultValue={states.linkedin.state}
        setInput={states.linkedin.function}
      />
      <SocialFormInput
        iconName="youtube"
        placeHolder="Youtube"
        defaultValue={states.youtube.state}
        setInput={states.youtube.function}
      />
      <SocialFormInput
        iconName="web"
        placeHolder="Website"
        defaultValue={states.website.state}
        setInput={states.website.function}
      />
      <SocialFormInput
        iconName="google-maps"
        placeHolder="Location"
        defaultValue={states.googlemaps.state}
        setInput={states.googlemaps.function}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
  },
});

export default SocialDetailsForm;
