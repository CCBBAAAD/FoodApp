import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getItem } from '../utils/asyncStorage';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
const ChooseRestaurant = ({ navigation }) => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [isSelected, setIsSelected] = useState(false);


    const cuisines = [
        { name: 'Thai Mango', image: require('../../assets/finalAssets/thaiMango.png'), details: "Taft — 15 Minutes" },
        { name: 'Subway', image: require('../../assets/finalAssets/subway.png'), details: "Mall of Asia — 25 Minutes" },
        { name: 'Projuice', image: require('../../assets/finalAssets/projuice.png'), details: "Taft — 10 Minutes" },
        { name: 'Kenny Rogers', image: require('../../assets/finalAssets/kennyRoger.png'), details: "Mall of Asia — 10 Minutes" },
    ];

    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');
    const [fStyle, setFStyle] = useState('Level 1');
    let [isFontStyleLoaded] = useFonts({
        Roboto_400Regular,
        Poppins_400Regular,
        Poppins_700Bold,
        Roboto_700Bold
    });
    const [loadingScreen, setLoadingScreen] = useState(false);

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

    const handleCuisinePress = (cuisineName) => {
        let newSelectedCuisines;

        if (selectedCuisines.includes(cuisineName)) {
            // If already selected, remove it from the array
            newSelectedCuisines = selectedCuisines.filter((name) => name !== cuisineName);
        } else {
            // Otherwise, add it to the array
            newSelectedCuisines = [...selectedCuisines, cuisineName];
        }

        setSelectedCuisines(newSelectedCuisines);
        setIsSelected(newSelectedCuisines.length > 0); // Set true if any items are selected
        console.log(`You selected ${cuisineName}`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.cuisineItem,
                { backgroundColor: selectedCuisines.includes(item.name) ? bgColor == 'Level 1' ? "#1D601A" : "#298825" : '#EDFFEF' },
            ]}
            onPress={() => handleCuisinePress(item.name)}
        >
            <Image source={item.image} style={styles.cuisineImage} resizeMode='contain' />
            <View styles={styles.itemDescription}>
                <Text style={[
                    styles.cuisineName,
                    { color: selectedCuisines.includes(item.name) ? 'white' : 'black', fontSize: fSize == 'Level 1' ? 12 : 14, },
                ]}>{item.name}</Text>
                <Text style={[
                    styles.cuisineDescription,
                    { color: selectedCuisines.includes(item.name) ? 'white' : 'black', fontSize: fSize == 'Level 1' ? 12 : 14, },
                ]}>{item.details}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loadingScreen) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Homepage'); }} style={[styles.backButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                    <Ionicons name="chevron-back" size={14} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'} />
                    {iers == 'Level 2' && <Text style={[styles.backText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Back</Text>}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>CHOOSE RESTAURANT</Text>
            </View>
            <View style={styles.headerProgress}>
                <Text style={[styles.progressText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Cuisine</Text>
                <Ionicons name="arrow-forward" size={fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC'} />
                <Text style={[styles.progressText, { fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Dish</Text>
                <Ionicons name="arrow-forward" size={fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC'} />
                <Text style={[styles.progressText, styles.boldText, { fontSize: fSize == 'Level 1' ? 18 : fSize == 'Level 2' ? 20 : 22, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Restaurant</Text>
            </View>
            <View style={styles.titleBar}>
                <Text style={[styles.subtitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Where do you want it from?</Text>

            </View>
            <FlatList
                data={cuisines}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={1}
                contentContainerStyle={styles.cuisineListContainer}
            />
            {isSelected && <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { navigation.navigate('Homepage'); }} >
                <Text style={[styles.addToCartText, {
                    paddingVertical: ies == 'Level 2' ? 14 : 8,
                    paddingHorizontal: ies == 'Level 1' ? 22 : ies == 'Level 2' ? 26 : 30,
                    fontSize: ies == 'Level 1' ? 16 : ies == 'Level 2' ? 18 : 20,
                    color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'

                }]}>Confirm</Text>
            </TouchableOpacity>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderBottomColor: '#eaeaea',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: "#298825",
        padding: 14,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'white'
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    headerProgress: {
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'center'
    },
    progressText: {
        fontSize: 18,
        marginHorizontal: 15,
    },
    boldText: {
        fontWeight: 'bold', // This will make the text bold
    },
    cuisineListContainer: {
        paddingHorizontal: 16,
    },
    subtitle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    titleBar: {
        marginTop: 30,
        marginBottom: 20
    },
    cuisineItem: {

        flex: 1,
        elevation: 5,
        alignItems: 'center',
        flexDirection: "row",
        margin: 8,
        borderRadius: 10, // Adjust as needed for your design
        padding: 16,
    },
    cuisineImage: {
        width: 80,
        height: 80,
        marginRight: 5
    },
    itemDescription: {
        flexDirection: 'column'


    },
    cuisineName: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    cuisineDescription: {
        marginLeft: 15,
        fontSize: 14,
        color: 'grey',
        textAlign: 'left'
    },
    addToCartButton: {
        marginHorizontal: 40,
        marginBottom: 20,
        backgroundColor: '#298825',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    addToCartText: {
        textAlign: 'center',
        fontWeight: 'bold',
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
    // Add more styles as needed
});

export default ChooseRestaurant;
