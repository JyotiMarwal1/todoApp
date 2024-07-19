import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images';
import { moderateScale } from '../utils/ScalingUtils';

const PasswordInput = props => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  return (
    <View style={[props.inputMainContainer, { backgroundColor: 'transparent' }]}>
      <View style={[styles.inputBoxContainer, props.inputBoxCon]}>
        <Image
          source={Images.lockIcon}
          style={styles.lockIcon}
          resizeMode='contain'
        />
        <TextInput
          // ref={(ref) => { props.refs && props.refs(ref) }}
          {...props}
          style={styles.inputBox}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          secureTextEntry={isPasswordVisible ? false : true}
          ref={props.refObj}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
        />
        {
          props.showEye ? <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              resizeMode='contain'
              source={isPasswordVisible ? Images.passwordHide : Images.passwordShow}
              style={{ width: moderateScale(20), height: moderateScale(20) }}
            />
          </TouchableOpacity> : null
        }
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
  },
  inputBox: {
    flex: 1,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    fontSize: moderateScale(16),

  },
  inputLabel: {
    paddingVertical: moderateScale(5),
  },
  lockIcon: {
    width: moderateScale(20),
    height: moderateScale(20)
  }
});
