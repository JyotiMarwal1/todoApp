import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import { goBack } from '../utils/NavigationObject';

/**
 * Handle back button
 * @param handler
 */

export function useBackButton(callBack?: Function) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, []);

  const handler = () => {
    if (callBack) {
      callBack();
      // BackHandler.removeEventListener('hardwareBackPress', handler);
    } else {
      goBack();
      // BackHandler.removeEventListener('hardwareBackPress', handler);
    }
    return true;
  };
}
