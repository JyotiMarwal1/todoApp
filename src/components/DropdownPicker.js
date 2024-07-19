import React, { useState } from 'react';
import {
  FlatList,
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

import { colors } from '../themes';
import { moderateScale } from '../utils/ScalingUtils';
import Images from '../assets/images';

export default function DropdownPicker({
  onItemChange,
  hedertitle,
  Data,
  placeholder,
  disable,
  style,
  require = true
}) {
  const [show, setshow] = useState(false);
  const [select, setselect] = useState('');
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderConatiner}>
        <TouchableOpacity
          onPress={() => {
            disable ? null : onChange(item);
          }}
          style={{}}
          disabled={disable}>
          <Text
            style={{ fontSize: moderateScale(14), padding: 10, color: 'black' }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  function onChange(item) {
    setselect(item.name), setshow(!show);
    onItemChange(item);
  }

  return (
    <View>
      {/* <Text
        title={hedertitle}
        style={{
          color: 'black',
          marginBottom: moderateScale(0.5),
          marginTop: moderateScale(1.4),
          fontSize: moderateScale(1.7),
        }}
      /> */}
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            marginTop: moderateScale(10),
            marginBottom: moderateScale(10),
            fontSize: moderateScale(16),
            color: colors.black,
          }}>
          {hedertitle}
        </Text>
        {require ? <Text
          style={{
            marginTop: moderateScale(12),
            marginBottom: moderateScale(10),
            fontSize: moderateScale(12),
            color: colors.gray58,
          }}>
          (Required)
        </Text> : null}
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setshow(!show)}
          style={[
            {
              width: '100%',
              height: moderateScale(6.5),
              borderBottomColor: show ? colors.gray92 : null,
              borderBottomWidth: show ? 1 : 0,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            },
            style,
          ]}
          disabled={disable}>
          <Text
            style={{ fontSize: moderateScale(14), padding: 10, color: 'black' }}>
            {select ? select : placeholder}
          </Text>
          {show ? (
            <Image
              style={{ marginRight: moderateScale(2) }}
              resizeMode="center"
            />
          ) : (
            <Image
              style={{ marginRight: moderateScale(2) }}
              resizeMode="center"
              source={Images.icondropdown}
            />
          )}
        </TouchableOpacity>
        {show ? (
          <FlatList
            data={Data}
            extraData={Data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            horizontal={true}
            contentContainerStyle={{
              flexDirection: 'column',
              flex: 1,
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.grayCF,
    borderWidth: 1,
    //marginTop:10,
    borderRadius: 10,
    paddingBottom: 5,
    backgroundColor: colors.white,
  },
  renderConatiner: {
    width: '95%',
    backgroundColor: colors.white,
  },

  rowContainer: {
    alignItems: 'center',
    width: '100%',
    marginLeft: moderateScale(2),
    marginRight: moderateScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(2),
  },
});
