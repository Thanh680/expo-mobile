import { useState, useRef } from 'react';
import { CameraView,CameraType, useCameraPermissions } from "expo-camera";
import {StyleSheet, TouchableOpacity, View, Text, Pressable} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from 'expo-router';

export default function Camera() {

    const [permission, requestPermission] = useCameraPermissions();

    const [cameraFace, setCameraFace] = useState<CameraType>('front');
    const [flash, setFlash] = useState<boolean>(false);
    const [mirror, setMirror] = useState<boolean>(false);


    const cameraRef = useRef<CameraView>(null);

    function takePhoto() {
        cameraRef.current?.takePictureAsync({
            skipProcessing: true,
        }).then(photo => {
            router.push({
                pathname: '/chat',
                params: { imageUri: photo.uri },
            });
            console.log("Photo taken:", photo, mirror);
        })
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <Text>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.buttonAllowPhoto}>
                    <Text>Autoriser l'application à prendre des photos</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{flex:1}}>
            <Pressable style={{flex:1}} onPress={() => takePhoto()}>
                <CameraView ref={cameraRef}
                            style={{flex:1}}
                            facing={cameraFace}
                            enableTorch={flash}
                            mirror={mirror}>
                </CameraView>
            </Pressable>
            <View style={{ position: "absolute", right: 10, top : "50%", marginBottom: 60 }}>
                <TouchableOpacity onPress={() => setCameraFace(cameraFace === 'front' ? 'back' : 'front')}>
                    <MaterialIcons name="flip-camera-android" size={50} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFlash(!flash)} style={{marginTop: 20}}>
                    <MaterialIcons name={flash ? "flash-on" : "flash-off"} size={50} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMirror(!mirror)} style={{marginTop: 20}}>
                    <MaterialIcons name="switch-camera" size={50} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
}
    const styles = StyleSheet.create({
        buttonAllowPhoto: {
            borderRadius: 5,
            backgroundColor: "blue",
            padding: 5,
            margin: 10,
        },
    });