import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo icons or any other icon library
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem } from '../utils/asyncStorage';
const SearchComponent = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingScreen, setLoadingScreen] = useState(false);

    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');

    const [restaurants, setRestaurants] = useState([
        { key: '1', name: 'Subway', screen: 'SubwayPage' },
        { key: '2', name: 'Kenny Rogers', screen: 'KennyRogersPage' },
        { key: '3', name: 'Projuice', screen: 'ProjuiceScreen' },
        { key: '4', name: 'Thai Mango', screen: 'ThaiMangoPage' },
    ]);

    const handleSearch = (text) => {
        setSearchQuery(text);


        const filteredRestaurants = restaurants.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setRestaurants(filteredRestaurants);

    };

    useEffect(() => {
        setLoadingScreen(true);
        fetchData(); // Function to fetch data
    }, []); // Run useEffect whenever navigation state changes

    const fetchData = async () => {
        console.log("fetching");
        setTimeout(async () => {
            try {
                const bgColor1 = await getItem('bgColor');
                if (!bgColor1) {
                    console.log("no bgColor");
                } else {

                    setBgColor(bgColor1);
                }

                const ies1 = await getItem('ies');
                if (!ies1) {
                    console.log("no ies");
                } else {

                    setIES(ies1);
                }

                const iers1 = await getItem('iers');
                if (!iers1) {
                    console.log("no iers");
                } else {

                    setIERS(iers1);
                }

                const fColor1 = await getItem('fColor');
                if (!fColor1) {
                    console.log("no fColor");
                } else {

                    setFColor(fColor1);
                }

                const fSize1 = await getItem('fSize');
                if (!fSize1) {
                    console.log("no fSize");
                } else {

                    setFSize(fSize1);
                }

                const cdl1 = await getItem('cdl');
                if (!cdl1) {
                    console.log("no cdl");
                } else {

                    setCDL(cdl1);
                }

                setLoadingScreen(false);

            } catch (error) {
                console.log(error);
            }
        }, 100);

        console.log(fSize);
    };

    if (loadingScreen) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainerScrolled}>

                <TouchableOpacity style={[styles.fab, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                    {iers == <Ionicons name="chevron-back" size={24} color="white" />}
                </TouchableOpacity>


                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#000" style={styles.searchicon} />
                    <TextInput
                        placeholder="Search restaurants"
                        style={styles.searchInput}
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                </View>
            </View>
            <Text style={styles.sectionTitle}>Popular searches</Text>
            <FlatList
                data={restaurants}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => { navigation.navigate(`${item.screen}`); }}>
                        <Ionicons name="search" size={20} color="grey" />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(1.5),
    },
    searchContainerScrolled: {
        flexDirection: 'row',
        paddingHorizontal: hp(1.5),

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 3,
            width: 3,
        },
        elevation: 3,
        width: '80%',
        marginBottom: 20,
        borderRadius: 10,
        paddingVertical: hp(1),
        paddingHorizontal: hp(1.5),

    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#424242',
    },
    searchicon: {
        padding: 5,
        color: 'grey'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#676767',

        marginLeft: 20,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#424242',
    },
    fab: {
        width: 42,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 3,
            width: 3,
        },
    },
    loadingText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',

    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'White', // Semi-transparent background
    },

    // Add additional styles as needed
});

export default SearchComponent;
