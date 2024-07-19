
import React, {
    useState,
} from 'react';
import {
    ActivityIndicator,
    Image,
    View,
} from 'react-native';
import colors from '../themes/colors';

export const NetworkImage = (props: any) => {
    const { style } = props
    const [loading, setLoading] = useState(false)
    const onLoadStart = () => {
        console.log("start load")
        setLoading(true)
    }
    const onLoadEnd = () => {
        console.log("end load")
        setLoading(false)
    }
    return (
        <>
            <Image onLoad={onLoadEnd} onLoadStart={onLoadStart} source={props.source} style={style} />
            {loading &&
                <View style={[style, { position: "absolute", alignItems: 'center', justifyContent: 'center' }]}>
                    <ActivityIndicator style={{ alignSelf: 'center' }} animating={true} color={colors.greenF} size={"large"} />
                </View>
            }
        </>
    )
}
