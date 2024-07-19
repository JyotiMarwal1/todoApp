import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  unstable_batchedUpdates,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../assets/images';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Images from '../assets/images';
import colors from '../themes/colors';
import type { FlashMessageParams } from '../types/types';
import { moderateScale } from '../utils/ScalingUtils';

var safeAreaTopHeight: number = 0

const FlashMessage = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('default');
  const [success, setSuccess] = useState(false);
  const insets = useSafeAreaInsets();
  safeAreaTopHeight = insets.top
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const init = () => {
    };
    init();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show: (params: FlashMessageParams) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        const tM = params.duration ?? 3000;
        unstable_batchedUpdates(() => {
          setVisible(true);
          setMessage(params.message);
          setSuccess(params.success ?? false);
        });
        setMessage(params.message);
        timerRef.current = setTimeout(() => {
          setVisible(false);
        }, tM);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );

  if (!visible) {
    return null;
  } else if (message)
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            borderColor: !success ? colors.red40 : colors.greenF,
            marginTop: Platform.OS == "android" ? getStatusBarHeight() + 10 : safeAreaTopHeight,

          },
        ]}>
        {!success ? (
          <Image
            source={Images.redExclamation}
            style={{ width: 25, height: 25, resizeMode: 'cover', marginRight: 5 }}
          />
        ) : (
          <Image
            source={Images.rightTickSuccessIcon}
            style={{ width: 25, height: 25, resizeMode: 'cover', marginRight: 5 }}
          />
        )}
        <Text
          style={{
            maxWidth: '95%',
            color: success ? colors.black : colors.red40,
          }}>
          {message}
        </Text>
      </View>
    );
  else {
    return null;
  }
});

export default FlashMessage;

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    position: 'absolute',
    padding: 10,
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: moderateScale(1)
  },
});
