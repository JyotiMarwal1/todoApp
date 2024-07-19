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

interface UploadImageProps {

    onImageSelection: () => {}
}

const UploadImages: React.FC<UploadImageProps> = props => {

    const [selectedImages, setSelectedImages] = useState<any>([]);

    const onPressImagePicker = async () => {
        Keyboard.dismiss()
        if (selectedImages.length === 5) {
            FlashMessageRef.show({ message: Strings.whenselectedMaxImages })
            return false
        } else {
            showAlertPicker({
                headerTitle: Constants.APP_NAME,
                headerMessage: Strings.cameraOrPhotoPickUpDescription,
                options: ["Choose From Gallery", "Take Picture"],
                onSelect: async (index: any) => {
                    if (index == 0) {
                        let galleryResponse = await chooseImageFromGallery()
                        console.log("galleryResponse==", galleryResponse)
                        if (!galleryResponse.didCancel && !galleryResponse.error) {
                            const image = {
                                uri: galleryResponse.uri,
                                type: galleryResponse.type,
                                name: `image_${new Date().getTime()}`
                            };
                            setSelectedImages((prevImages: any) => [...prevImages, image]);
                            let selectedImageArray = selectedImages
                            selectedImageArray.push(image)
                            props.onImageSelection(selectedImageArray)
                        }
                    } else {
                        let cameraResponse = await chooseImageFromCamera()
                        console.log("cameraResponse", cameraResponse)
                        if (!cameraResponse.didCancel && !cameraResponse.error) {
                            const image = {
                                uri: cameraResponse.uri,
                                type: cameraResponse.type,
                                name: `image_${new Date().getTime()}`
                            };
                            setSelectedImages((prevImages: any) => [...prevImages, image]);
                            let selectedImageArray: any = selectedImages
                            selectedImageArray.push(image)
                            props.onImageSelection(selectedImageArray)
                        }
                    }
                }
            })
        }
    }

    console.log("selectedImages", selectedImages)

    const onImageCrossIconPress = (index: any) => {
        const newArr = [...selectedImages];
        newArr.splice(index, 1);
        setSelectedImages(newArr);
        props.onImageSelection(newArr)
    };

    const renderImageItem = ({ item, index }: any) => (
        <View style={styles.imageAndCrossContainer}>
            <Image source={item} style={styles.image} />
            <TouchableOpacity
                style={styles.closeBtn}
                hitSlop={styles.hitSlop}
                onPress={() => onImageCrossIconPress(index)}>
                <PrimaryImage
                    primaryImgSource={Images.close}
                    primaryImageStyle={styles.close}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={onPressImagePicker}
            >
                <PrimaryImage
                    primaryImgSource={Images.newUploadImg}
                    primaryImageStyle={styles.uploadImage}
                />
            </TouchableOpacity>
            <FlatList
                data={selectedImages}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageList}
                scrollEnabled={true}
            />
        </View>
    )
}

export default UploadImages

const styles = StyleSheet.create({
    uploadImage: {
        width: '100%',
        height: moderateScale(76),

    },
    container: {
        marginTop: moderateScale(10),
    },
    imageList: {
    },
    image: {
        width: moderateScale(61),
        height: moderateScale(58),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: colors.grayDB,
        marginRight: moderateScale(5)
    },
    mainContainer: {
    },
    imageAndCrossContainer: {
        paddingVertical: moderateScale(10),
    },
    closeBtn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: moderateScale(11),
        paddingRight: moderateScale(1.5)
    },
    hitSlop: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    },
    close: {
        width: moderateScale(18),
        height: moderateScale(18),
    },
})

