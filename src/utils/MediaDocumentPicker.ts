import DocumentPicker from 'react-native-document-picker';

//TODO: will use in future
class MediaDocumentPicker {

    /**
     * Pick a single media file and return results as (uri,type,name,size)
     */
    pickSingleMedia = async () => {
        /**
         * chooses available mime types (images and mp4 videos)
         */
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
            });
            console.log("selected media file detail:- ", JSON.stringify(result[0]));
            return result[0]
        } catch (error) {
            console.log("error in picking media file :-", JSON.stringify(error))
            if (DocumentPicker.isCancel(error)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw error;
            }
        }

    }

}

export default new MediaDocumentPicker()