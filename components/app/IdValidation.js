import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { setItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Import FileSystem to handle file access
const IdValidation = ({ navigation }) => {
    const [idNumber, setIdNumber] = useState(''); // Set the fullName from the passed param or default to empty
    const [expirationDate, setExpirationDate] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        (async () => {
            await requestMediaLibraryPermissions();

        })();
    });


    const handleContinue = () => {

        setItem('idSaved', "successfull");

        navigation.navigate('ChooseCuisine');
    };


    const requestMediaLibraryPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            // Use FileSystem to read the selected image as a blob
            const response = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Now 'response' contains the image data as base64
            // You can use it to display the image or upload it as needed
            setProfileImage(`data:image/jpeg;base64,${response}`);
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.titleText}>ID Validation</Text>
            </View>
            <View style={styles.content}>

                <Text style={styles.bodyText}> Senior ID Photo</Text>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Image
                        source={profileImage ? { uri: profileImage } : require('../../assets/image_placeholder.png')}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                <Text style={styles.bodyText}> ID Number</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setIdNumber}
                    value={idNumber}
                    placeholder="----/----/----/----"
                />
                <Text style={styles.bodyText}> label </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setExpirationDate}
                    value={expirationDate}
                    placeholder="01-01-2024"
                />
                <TouchableOpacity style={styles.locationButton} >
                    <Text style={styles.locationButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.agreeButton} onPress={handleContinue}>
                    <Text style={styles.agreeButtonText}>Confirm</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Adjust the background color to match the design
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    map: {
        width: '100%',
        height: '40%',
        marginBottom: 25,
    },
    titleText: {
        paddingVertical: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white', // Adjust the font color to match the design
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    methodOption: {
        padding: 15,

        flexDirection: 'row',
        alignItems: 'center',
        // Rest of your styling
    },
    selectedMethod: {
        backgroundColor: '#f0e68c'
        // Rest of your styling
    },
    profileImage: {
        marginVertical: 25,
        width: 300,
        height: 125,
        borderRadius: 25,

    },
    imagePicker: {
        alignItems: 'center',

    },
    input: {
        height: 50,

        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 15,
        paddingHorizontal: 15,

        backgroundColor: '#F5F5F5'
    },
    bodyText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black', // Adjust the font color to match the design
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'justify'
    },

    locationButton: {
        backgroundColor: 'white', // Adjust the button color to match the design
        borderRadius: 15,
        paddingVertical: 10,
        width: '85%',
        borderColor: 'black',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,
    },
    agreeButton: {
        backgroundColor: '#000', // Adjust the button color to match the design
        borderRadius: 15,
        paddingVertical: 10,
        width: '85%',

        alignSelf: 'center',
        marginTop: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 30, // Set the width as needed
        height: 30, // Set the height as needed
        marginRight: 10, // Add some spacing between the icon and the text
    },
    agreeButtonText: {
        fontSize: 18,
        color: '#fff', // Adjust the font color to match the design
        textAlign: 'center',
    },
    locationButtonText: {
        fontSize: 18,
        color: 'black', // Adjust the font color to match the design
        textAlign: 'center',
    },
    divider: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 3,
        flexGrow: 1,
        marginBottom: 10,
    },
});

export default IdValidation;
