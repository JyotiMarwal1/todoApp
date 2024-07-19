import React, { useState } from 'react';
import { FlatList, Image, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images';
import { Strings } from '../localization/Strings';
import { colors } from '../themes';
import Constants from '../utils/Constants';
import FlashMessageRef from '../utils/FlashMessageRef';
import { chooseImageFromCamera, chooseImageFromGallery } from '../utils/ImageManager';
import { moderateScale } from '../utils/ScalingUtils';
import { showAlertPicker } from '../utils/UtilityFunc';
import PrimaryImage from './PrimaryImage';
import MediaDocumentPicker from '../utils/MediaDocumentPicker';

interface UploadSingleImageProps {

    onImageSelection: () => {}
}

const UploadSingleImage: React.FC<UploadSingleImageProps> = props => {

    const [selectedImages, setSelectedImages] = useState<any>();
    const [fileType, setFileType] = useState<any>('')

    const onPressImagePicker = async () => {
        Keyboard.dismiss()
        const res = await MediaDocumentPicker.pickSingleMedia()
        console.log("**********************",res)
        const image = {
            uri: res?.uri,
            type: res?.type,
            name: `file_${new Date().getTime()}`
        };
        let fileType = res?.type?.split("/")[0]
        setFileType(fileType)
        setSelectedImages(image);
        props.onImageSelection(image)
    }

    const onImageCrossIconPress = () => {
        setSelectedImages(null)
    };

    return (
        <View style={styles.mainContainer}>
            {selectedImages ? <TouchableOpacity
                style={styles.closeBtn}
                hitSlop={styles.hitSlop}
                onPress={() => onImageCrossIconPress()}>
                <PrimaryImage
                    primaryImgSource={Images.close}
                    primaryImageStyle={styles.close}
                />
            </TouchableOpacity> : null}
            <TouchableOpacity
                onPress={onPressImagePicker}
            >
                <PrimaryImage
                    primaryImgSource={selectedImages ? fileType== "image" ? selectedImages : Images.pdfIcon : Images.uploadImgIcon}
                    primaryImageStyle={styles.uploadImage}
                />
            </TouchableOpacity>
        </View>
    )
}

export default UploadSingleImage

const styles = StyleSheet.create({
    mainContainer: {
        width: moderateScale(86),
        height: moderateScale(86),
        marginTop: moderateScale(15),
    },
    uploadImage: {
        width: moderateScale(86),
        height: moderateScale(86),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.greenF,
        overflow:"hidden",
        resizeMode:"stretch"
    },
    hitSlop: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    },
    closeBtn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: moderateScale(-8),
        right: moderateScale(-10),
        zIndex: 10
    },
    close: {
        width: moderateScale(25),
        height: moderateScale(25),
    }
})

