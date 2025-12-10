import {FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@comp/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {Link} from "expo-router";
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

export default function ChatScreen() {

    type message = {
        user: string;
        message?: string;
        image?: string;
    }

    // état du texte à saisir
    const [messageText, setMessageText] = useState<string>("");

    // état de l'image preview (reçue depuis la caméra)
    const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();

    const [currentImageUri, setCurrentImageUri] = useState<string | null>(
        imageUri ?? null
    );


    const addMessage = (text: string, imageUri?: string) => {
        setConversation(prev => [
            ...prev,
            {
                user: "John",
                message: imageUri ? undefined : text,
                image: imageUri ? imageUri : undefined
            }
        ]);
    };

    const [conversation, setConversation] = useState<message[]>([
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        },
        {
            user: "John",
            message: "Hello, how are you?"
        },
        {
            user: "Bot",
            message: "I'm good, thanks! How about you?"
        }
    ])

    const styleMessageUser = (user: string) => {
        if (user === "John") {
            return {
                backgroundColor: "#1c45e1",
                color: "#ffffff",
                alignSelf: "flex-end" as "flex-end"
            }
        }
        return {
            backgroundColor: "#e0e0e0",
            color: "#000000",
        }
    }

  return (
    <ThemedView style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
            <ThemedText type={"title"} >hello world</ThemedText>
            <FlatList style={styles.dialog} data={conversation} renderItem={({item})=>{
                return (
                    <View style={[styles.message, styleMessageUser(item.user)]}>
                    {item.image ? (
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 200,width: 200, borderRadius: 5 }}
                            contentFit="cover"
                        />
                    ) : (
                    <Text style={styleMessageUser(item.user)}>{item.message}</Text>
                        )}
                    </View>
                );
            }}>
            </FlatList>
            <View style={styles.inputContainer}>
                {currentImageUri ? (
                    <Image
                        source={{ uri: currentImageUri }}
                        style={{ marginVertical: 10, flex:1}}
                        contentFit="contain"
                    />
                ) : (
                    <TextInput
                        value={messageText}
                        onChangeText={setMessageText}
                        style={styles.textInput}
                        placeholder="Type a message"
                    />
                )}
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonSend} onPress={() => {
                        if (imageUri) {
                            addMessage("", imageUri);
                            setCurrentImageUri(null);
                        } else {
                            addMessage(messageText);
                            setMessageText("");
                        }
                    }}>
                        <FontAwesome name="send" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPhoto}>
                        <Link href="/camera">
                        <FontAwesome name="camera" size={24} color="black" />
                        </Link>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    containerButtons: {
        width: 60,
    },
    buttonSend: {
        margin: 5,
        padding: 5,
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: "#cccccc",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonPhoto: {
        margin: 5,
        padding: 5,
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: "#cccccc",
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        flexDirection: "row",
        height: 100,
        borderTopWidth: 1,
        borderColor: "#cccccc",
    },
    message: {
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#e0e0e0",
        marginVertical: 5,
        marginHorizontal: 10,
        alignSelf: "flex-start",
    },
    dialog: {
        flex: 1
    },
    textInput: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        flex:1
    },
});
