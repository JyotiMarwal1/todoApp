import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {moderateScale} from '../utils/ScalingUtils';
import {Fonts, colors} from '../themes';

const RNRadioButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props?.action} style={styles.row}>
      <View style={styles.outerCircle}>
        {props.selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text style={styles.title}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    height: moderateScale(25),
    width: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: colors.greenF
  },
  innerCircle: {
    height: moderateScale(16),
    width: moderateScale(16),
    backgroundColor: colors.greenF,
    borderRadius: moderateScale(50),
  },
  title: {
    textAlignVertical: 'center',
    paddingLeft: moderateScale(15),
    fontSize: moderateScale(16),
    color: colors.black,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: moderateScale(8)
  },
});

export default RNRadioButton;