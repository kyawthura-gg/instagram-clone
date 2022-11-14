import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import {
  Camera,
  CameraPictureOptions,
  CameraRecordingOptions,
  CameraType,
  FlashMode,
  VideoQuality,
} from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FlashModes = [
  {
    icon: "flash-off",
    value: FlashMode.off,
  },
  {
    icon: "flash-on",
    value: FlashMode.on,
  },
  {
    icon: "flash-auto",
    value: FlashMode.auto,
  },
  {
    icon: "highlight",
    value: FlashMode.torch,
  },
] as const;

export const CameraScreen = () => {
  const cameraRef = useRef<Camera>(null);
  const { navigate } = useNavigation();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashType, setFlashType] = useState(FlashMode.off);
  const [cameraReady, setCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const cameraNotReady = !cameraReady || !cameraRef.current;
  const activeFlashIcon = FlashModes?.find((x) => x.value === flashType)?.icon;

  const handleFlash = () => {
    const currentIndex = FlashModes.findIndex((x) => x.value === flashType);
    const maxIndex = FlashModes.length - 1;
    const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setFlashType(FlashModes[nextIndex].value);
  };

  const takePic = async () => {
    if (cameraNotReady) {
      return;
    }
    const options: CameraPictureOptions = {
      quality: 0.5,
      skipProcessing: true,
    };
    const result = await cameraRef.current.takePictureAsync(options);
    console.log(result);
  };
  const recordVideo = async () => {
    if (cameraNotReady || isRecording) {
      return;
    }
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      quality: VideoQuality["720p"],
      maxDuration: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };
    try {
      const result = await cameraRef.current.recordAsync(options);
      console.warn("Recording", result);
    } catch (error) {
      console.error("Recording Err:", error);
    }
    setIsRecording(false);
  };
  const stopRecording = () => {
    if (!isRecording) {
      return;
    }
    cameraRef.current?.stopRecording();
    setIsRecording(false);
    console.warn("Stop recording");
  };

  console.log(permission?.granted);
  if (!permission?.granted) {
    requestPermission();
    console.log(permission?.granted);
  }

  const toggleCameraType = () =>
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );

  return (
    <View className="flex-1 bg-black">
      <Camera
        ref={cameraRef}
        className="w-full h-full"
        type={cameraType}
        ratio="4:3"
        onCameraReady={() => setCameraReady(true)}
      />
      <View className="absolute top-5 flex-row justify-around w-full items-center">
        <MaterialIcons name="close" size={30} color={"#fff"} />
        <MaterialIcons
          onPress={handleFlash}
          name={activeFlashIcon}
          size={30}
          color={"#fff"}
        />
        <MaterialIcons name="settings" size={30} color={"#fff"} />
      </View>
      <View className="absolute flex-row bottom-5 justify-around w-full items-center">
        <MaterialIcons name="photo-library" size={30} color={"#fff"} />
        {cameraReady && (
          <Pressable
            onPress={takePic}
            onLongPress={recordVideo}
            onPressOut={stopRecording}
            className={`bg-white w-12 h-12  rounded-full ${
              isRecording ? "bg-red-500" : ""
            }`}
          />
        )}
        {/* //TODO start of remove this */}
        <Pressable
          onPress={() => {
            console.log("Post");
            navigate("CreatePost", {
              images: [
                "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg",
                "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg",
              ],
            });
          }}
          className={`bg-white w-12 h-12  rounded-full ${
            isRecording ? "bg-red-500" : ""
          }`}
        />
        {/* //TODO end of remove this */}
        <Pressable onPress={toggleCameraType}>
          <MaterialIcons name="flip-camera-ios" size={30} color={"#fff"} />
        </Pressable>
      </View>
    </View>
  );
};
