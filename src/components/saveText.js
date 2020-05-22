import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';


// solution by anro
//https://stackoverflow.com/questions/54586216/how-to-create-text-file-in-react-native-expo
export async function saveFile(data,start,end) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        let fileUri = FileSystem.documentDirectory + "Infantini_Export"+ start +"-"+ end +".txt";
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}
