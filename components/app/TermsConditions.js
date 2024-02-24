import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { getItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
const TermsConditions = ({ navigation }) => {
    const [firstName, setFirstName] = useState(''); // Set the fullName from the passed param or default to empty
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // Set the email from the passed param or default to empty
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        (async () => {
            const fName = await getItem('firstname');
            console.log(fName);
            setFirstName(fName);

            const lName = await getItem('lastName');
            console.log(lName);
            setLastName(lName);

            const mail = await getItem('email');
            setEmail(mail);

            const number = await getItem('phoneNumber');
            setPhoneNumber(number);

            const add = await getItem('address');
            setAddress(add);


        })();

    });

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.titleText}>Terms and Conditions</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.headerText}>Mobile App Consent Letter of Agreement</Text>
                <Text style={styles.dateText}>Date: 1/1/2000</Text>
                <Text style={styles.userText}>User: {firstName} {lastName}</Text>
                <Text style={styles.mainText}>
                    Introduction This Consent Letter of Agreement ("Agreement") is
                    entered into between [Your Company Name] ("We", "Us", or "Our") and
                    the user ("You" or "Your"), regarding Your use of [Your App Name], a
                    mobile application (the "App"). By downloading, accessing, or using
                    the App, You agree to be bound by the terms of this Agreement.
                    1. Acceptance of Terms You agree that by accessing the App, You
                    have read, understood, and agree to be bound by this Agreement. If
                    You do not agree with all of these terms, do not access or use the App.
                </Text>

                <Text style={styles.bodyText}>
                    2. Privacy Policy Your access to and use of the App is also
                    conditioned on Your acceptance of and compliance with the Privacy
                    Policy of [Your Company Name]. Our Privacy Policy describes Our
                    policies and procedures on the collection, use, and disclosure of Your
                    personal information when You use the App and tells You about Your
                    privacy rights and how the law protects You. Please read Our Privacy
                    Policy carefully before using Our App.</Text>

                <Text style={styles.bodyText}>
                    3. Use of the App The App is intended for [describe the intended
                    audience and use of the app]. You agree to use the App only for lawful
                    purposes and in accordance with this Agreement. </Text>

                <Text style={styles.bodyText}>
                    4. Intellectual Property Rights The App and its original content,
                    features, and functionality are and will remain the exclusive property of
                    [Your Company Name] and its licensors.
                </Text>

                <Text style={styles.bodyText}>
                    5. Changes to This Agreement We reserve the right, at Our sole
                    discretion, to modify or replace this Agreement at any time. If a
                    revision is material, We will provide at least [number of days] days'
                    notice prior to any new terms taking effect. What constitutes a
                    material change will be determined at Our sole discretion.
                </Text>

                <Text style={styles.bodyText}>
                    6. Contact Us If you have any questions about this Agreement,
                    You can contact us at: </Text>

                <Text style={styles.bodyText}> Email: [{email}] </Text>
                <Text style={styles.bodyText}> Phone: [{phoneNumber}]  </Text>
                <Text style={styles.addressText}>Address: [{address}] </Text>


                {/* ... Continue with the rest of your terms and conditions text */}
            </ScrollView>
            <TouchableOpacity style={styles.agreeButton} onPress={() => navigation.navigate('PaymentMethod')}>
                <Text style={styles.agreeButtonText}>I Agree</Text>
            </TouchableOpacity>
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
    headerText: {
        fontSize: 18,
        color: '#333', // Adjust the font color to match the design
        marginBottom: 5,
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 16,
        color: '#333', // Adjust the font color to match the design
        marginBottom: 5,
    },
    userText: {
        fontSize: 16,
        color: '#333', // Adjust the font color to match the design
        marginBottom: 15,
    },
    bodyText: {
        fontSize: 11,
        color: '#333', // Adjust the font color to match the design
        lineHeight: 24,

        textAlign: 'justify'
    },
    addressText: {
        fontSize: 11,
        color: '#333', // Adjust the font color to match the design
        lineHeight: 24,
        marginBottom: 50,
        textAlign: 'justify'
    },
    mainText: {
        fontSize: 11,
        color: '#333', // Adjust the font color to match the design
        lineHeight: 24,

        fontWeight: "bold",
        textAlign: 'justify'
    },
    agreeButton: {
        backgroundColor: '#000', // Adjust the button color to match the design
        borderRadius: 15,
        paddingVertical: 10,
        width: '80%',

        alignSelf: 'center',
        marginBottom: 20,
    },
    agreeButtonText: {
        fontSize: 18,
        color: '#fff', // Adjust the font color to match the design
        textAlign: 'center',
    },
});

export default TermsConditions;
