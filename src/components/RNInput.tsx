import React, { useState } from 'react';
import {
  Platform,
  StyleSheet, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Images from '../assets/images';
import { colors } from '../themes';
import { moderateScale } from '../utils/ScalingUtils';
import PrimaryImage from './PrimaryImage';
import PrimaryText from './PrimaryText';

interface RNInputProps {
  passwordInput?: boolean;
  inputIcon?: string;
  placeholder: string;
  maxLength?: number;
  refObj?: any;
  returnKeyType?: any;
  onSubmitEditing?: any;
  value: any;
  onChangeText: any;
  keyboardType?: any;
  textContentType?: any;
  isCountryCode?: boolean;
  countryCode?: string;
  inputContainerStyle?: object,
  autoCapitalize?: any
}

const RNInput: React.FC<RNInputProps> = props => {
  return (
    <View style={[styles.container, props.inputContainerStyle]}>
          <View style={styles.iconAndInputCon}>
            {props.inputIcon ? <PrimaryImage
              primaryImgSource={props.inputIcon}
              primaryImageStyle={styles.lefticonStyle}
            /> : null}
            {
              props?.isCountryCode ? <PrimaryText
                text={` ${props?.countryCode}`}
                primaryTextStyle={styles.countryCodeStyle}
              /> : null
            }
            <TextInput
              value={props.value}
              onChangeText={props.onChangeText}
              placeholder={props.placeholder}
              style={[styles.inputStyle, {paddingLeft: props.inputIcon ? moderateScale(10): moderateScale(0)}]}
              placeholderTextColor={colors.grayD4}
              autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
              autoCorrect={false}
              keyboardType={props.keyboardType}
              ref={props.refObj}
              returnKeyType={props.returnKeyType}
              onSubmitEditing={props.onSubmitEditing}
              maxLength={props.maxLength}
            />
      </View>
    </View>
  );
};

export default RNInput;

const styles = StyleSheet.create({
  iconAndInputCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomColor: colors.grayC3,
    borderBottomWidth: moderateScale(1),
    paddingHorizontal: moderateScale(2),
    alignItems: 'center',
    paddingVertical:
      Platform.OS == 'ios' ? moderateScale(10) : moderateScale(0),
  },
  lefticonStyle: {
    height: moderateScale(23),
    width: moderateScale(23),
    resizeMode: 'contain',
    tintColor: colors.black
  },
  iconStyle: {
    height: moderateScale(15),
    width: moderateScale(17),
    resizeMode: 'contain',
    tintColor: colors.black
  },
  inputStyle: {
    borderWidth: moderateScale(1),
    borderColor: colors.grayCB,
    borderRadius: moderateScale(7),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(5),
    fontSize: moderateScale(16),
    color: colors.black
  },

  container: {
    paddingTop: moderateScale(10),
  },
  countryCodeStyle: {
    fontSize: moderateScale(16),
    // fontFamily: Fonts.FONT_FAMILY_REGULAR,
    paddingLeft: moderateScale(5)
  }
});
