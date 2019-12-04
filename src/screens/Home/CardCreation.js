import React, {Component, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Container, Tab, Tabs, StyleProvider} from 'native-base';
import BasicDetailsForm from '../CardCreation/BasicDetailsForm';
import ImageDetailsForm from '../CardCreation/ImageDetailsForm';
import SocialDetailsForm from '../CardCreation/SocialDetailsForm';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {initializeCardsStore} from '../../store/actions/cards';

const mapToUpdateRequest = states => {
  const updateRequest = {
    id: states.id,
    userid: states.user_id,
    email: states.email,
    phone: states.mobilephone.state,
    name: states.name.state,
    website: states.website.state,
    youtube: states.youtube.state,
    linkedin: states.linkedin.state,
    googlemaps: states.googlemaps.state,
    facebook: states.facebook.state,
    twitter: states.twitter.state,
    instagram: states.instagram.state,
    countrycode: states.mb_country.state,
    designation: states.designation.state,
    industry: states.industry_id.state,
    companyname: states.company_name.state,
    officeph1_country: states.telephone1_country.state,
    officeph2_country: states.telephone2_country.state,
    offphone1: states.telephone.state,
    offphone2: states.telephone2.state,
    address: states.address.state,
    city: states.city.state,
    country: states.country.state,
    postalcode: states.postalcode.state,
    avatar: states.base64.state,
  };

  Object.keys(updateRequest).map((key, index) => {
    if (updateRequest[key] === '') updateRequest[key] = null;
  });
  return updateRequest;
};
const mapToReduxStore = states => {
  const reduxObj = {
    id: states.id,
    user_id: states.user_id,
    email: states.email,
    barcode_img: states.barcode_img,
  };
  for (key in states) {
    if (
      key != 'id' &&
      key != 'email' &&
      key != 'user_id' &&
      key != 'barcode_img'
    ) {
      reduxObj[key] = states[key].state || '';
    }
  }
  return reduxObj;
};
const CardCreation = props => {
  const dispatch = useDispatch();
  const updateCardHandler = useCallback(
    userDetails => {
      dispatch(initializeCardsStore(userDetails));
    },
    [dispatch],
  );
  const {
    id,
    user_id,
    name,
    email,
    mb_country,
    mobilephone,
    designation,
    office_phone_ext,
    company_name,
    industry_id,
    telephone1_country,
    telephone,
    telephone2_country,
    telephone2,
    address,
    city,
    country,
    postalcode,
    facebook,
    linkedin,
    website,
    instagram,
    twitter,
    googlemaps,
    youtube,
    avatar,
    base64,
    barcode_img,
  } = useSelector(state => state.cards.userDetails);
  const [newBase64, setBase64] = useState(!base64 ? '' : base64);
  const [newAvatar, setAvatar] = useState(!avatar ? '' : avatar);
  const [newYoutube, setYoutube] = useState(!youtube ? '' : youtube);
  const [newGoogleMaps, setGoogleMaps] = useState(
    !googlemaps ? '' : googlemaps,
  );
  const [newFacebook, setFacebook] = useState(!facebook ? '' : facebook);
  const [newLinkedin, setLinkedin] = useState(!linkedin ? '' : linkedin);
  const [newWebsite, setWebsite] = useState(!website ? '' : website);
  const [newInstagram, setInstagram] = useState(!instagram ? '' : instagram);
  const [newTwitter, setTwitter] = useState(!twitter ? '' : twitter);
  const [newCity, setCity] = useState(!city ? '' : city);
  const [newAddress, setAddress] = useState(!address ? '' : address);
  const [newPostalCode, setPostalCode] = useState(
    !postalcode ? '' : postalcode,
  );
  const [newName, setName] = useState(!name ? '' : name);
  const [newCompanyName, setCompanyName] = useState(
    !company_name ? '' : company_name,
  );
  const [newIndustryId, setIndustryId] = useState(
    industry_id === 0 ? null : industry_id,
  );
  const [newDesignation, setDesignation] = useState(
    !designation ? '' : designation,
  );
  const [newMobileNumber, setMobileNumber] = useState(
    !mobilephone ? '' : mobilephone,
  );
  const [newOfficePhoneExt, setOfficePhoneExt] = useState(
    !office_phone_ext ? '' : office_phone_ext,
  );

  const [newTelephone1Number, setTelephone1Number] = useState(
    !telephone ? '' : telephone,
  );
  const [newTelephone2Number, setTelephone2Number] = useState(
    !telephone2 ? '' : telephone2,
  );
  const [newTelephone1CallingCode, setTelephone1CallingCode] = useState(
    telephone1_country || '65',
  );
  const [newTelephone2CallingCode, setTelephone2CallingCode] = useState(
    telephone2_country || '65',
  );
  const [newMobileCallingCode, setMobileCallingCode] = useState(
    !mb_country ? 65 : mb_country,
  );
  const [newCountry, setCountry] = useState(!country ? 'Singapore' : country);

  const states = {
    id: id,
    user_id: user_id,
    email: email,
    barcode_img: barcode_img,
    city: {state: newCity, function: setCity},
    address: {state: newAddress, function: setAddress},
    postalcode: {state: newPostalCode, function: setPostalCode},
    name: {state: newName, function: setName},
    industry_id: {state: newIndustryId, function: setIndustryId},
    company_name: {state: newCompanyName, function: setCompanyName},
    designation: {state: newDesignation, function: setDesignation},
    mobilephone: {state: newMobileNumber, function: setMobileNumber},
    office_phone_ext: {state: newOfficePhoneExt, function: setOfficePhoneExt},
    telephone: {state: newTelephone1Number, function: setTelephone1Number},
    telephone2: {state: newTelephone2Number, function: setTelephone2Number},
    telephone1_country: {
      state: newTelephone1CallingCode,
      function: setTelephone1CallingCode,
    },
    telephone2_country: {
      state: newTelephone2CallingCode,
      function: setTelephone2CallingCode,
    },
    mb_country: {
      state: newMobileCallingCode,
      function: setMobileCallingCode,
    },
    country: {state: newCountry, function: setCountry},
    facebook: {state: newFacebook, function: setFacebook},
    twitter: {state: newTwitter, function: setTwitter},
    instagram: {state: newInstagram, function: setInstagram},
    linkedin: {state: newLinkedin, function: setLinkedin},
    googlemaps: {state: newGoogleMaps, function: setGoogleMaps},
    website: {state: newWebsite, function: setWebsite},
    youtube: {state: newYoutube, function: setYoutube},
    avatar: {state: newAvatar, function: setAvatar},
    base64: {state: newBase64, function: setBase64},
  };
  useEffect(() => {
    props.navigation.setParams({updateCard: updateCardHandler});
  }, [updateCardHandler]);

  useEffect(() => {
    props.navigation.setParams({states: states});
  }, [
    newCountry,
    newMobileCallingCode,
    newTelephone1Number,
    newTelephone2Number,
    newTelephone1CallingCode,
    newTelephone2CallingCode,
    newOfficePhoneExt,
    newMobileNumber,
    newDesignation,
    newIndustryId,
    newYoutube,
    newCity,
    newAddress,
    newPostalCode,
    newName,
    newGoogleMaps,
    newFacebook,
    newLinkedin,
    newWebsite,
    newInstagram,
    newTwitter,
    newCompanyName,
    newAvatar,
    newBase64,
  ]);

  return (
    <>
      <Container>
        <Tabs style={styles.bar}>
          <Tab style={styles.bar} heading="BASIC">
            <BasicDetailsForm states={states} email={email} />
          </Tab>
          <Tab heading="SOCIAL">
            <SocialDetailsForm states={states} />
          </Tab>
          <Tab heading="IMAGE">
            <ImageDetailsForm states={states} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

CardCreation.navigationOptions = navigationData => {
  const states = navigationData.navigation.getParam('states');
  const updateCard = navigationData.navigation.getParam('updateCard');

  // Send post request and then update redux store
  const sendUpdateCardRequest = updateRequest => {
    fetch('https://solucardz.com/api/v1/updatecard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRequest),
    })
      .then(response => response.json())
      .then(async responseJson => {
        if (responseJson.error == false) {
          updateCard(mapToReduxStore(states));
          Toast.show('Card has been updated!');
          navigationData.navigation.pop();
        } else {
          alert('Error');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return {
    headerTitle: 'Edit Cardz',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="save"
          onPress={() => {
            const updateRequest = mapToUpdateRequest(states);
            sendUpdateCardRequest(updateRequest);
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default CardCreation;
