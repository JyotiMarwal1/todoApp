import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../themes'
import { moderateScale } from '../utils/ScalingUtils'
import PrimaryImage from './PrimaryImage'

interface PrimaryHeaderProps {
    onBackIconPress?: () => void
    HeaderTitle?: string
    isShownHeaderTitle: boolean
    isShownBackIcon: boolean
    isShowRightAddIcon?: boolean
    onRightIconPress?: () => void
    headerLeftSideImg?: any
    headerRightSideImg?: any
}

const PrimaryHeader = ({ onBackIconPress, HeaderTitle, isShownHeaderTitle, isShownBackIcon, isShowRightAddIcon, onRightIconPress, headerLeftSideImg, headerRightSideImg }: PrimaryHeaderProps) => {
    return (
        <View style={styles.container}>

            {/* {isShownBackIcon ? <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={onBackIconPress}>
                <PrimaryImage
                    primaryImgSource={Images.backIcon}
                    primaryImageStyle={styles.backIconStyle}
                />
            </TouchableOpacity> : <View></View>} */}
            {isShownBackIcon ? <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={onBackIconPress}>
                <PrimaryImage
                    primaryImgSource={headerLeftSideImg}
                    primaryImageStyle={styles.backIconStyle}
                />
            </TouchableOpacity> : <View></View>}
            {isShownHeaderTitle ?
                <Text style={styles.headerTxt}>{HeaderTitle}</Text> : null
            }

            {isShowRightAddIcon ? <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={onRightIconPress}>
                <PrimaryImage
                    primaryImgSource={headerRightSideImg}
                    primaryImageStyle={styles.addCircleStyle}
                />
            </TouchableOpacity> : <View></View>}
        </View>
    )
}

export default PrimaryHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backIconStyle: {
        // width: moderateScale(9),
        // height: moderateScale(17),
        width: moderateScale(17),
        height: moderateScale(17),
        tintColor: colors.white
    },
    headerTxt: {
        color: colors.white,
        fontSize: moderateScale(16),
        lineHeight: moderateScale(19.36)
    },
    hitSlop: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    },
    addCircleStyle: {
        width: moderateScale(25),
        height: moderateScale(25)
    }
})