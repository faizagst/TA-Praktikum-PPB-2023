import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import axios from 'axios';

const KDramaScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [queryTitles, setQueryTitles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!loading) {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b2bd88d5ce5e168ce72a6d589ceab4a5&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=18&with_original_language=ko&first_air_date_year=&page=${page}`);
                setData((prevState) => [...prevState, ...res.data.results]);
                setPage((prevState) => prevState + 1);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    };

    const handleSearch = (query, nextPage) => {
        if (query !== "") {
            const filteredTitles = data.filter(
                (title) =>
                    title.name.toLowerCase().includes(query.toLowerCase()) ||
                    title.original_name.toLowerCase().includes(query.toLowerCase())
            );
            setQueryTitles(filteredTitles);
        } else {
            setQueryTitles([]);
        }
        setSearchQuery(query);
    };

    const nextPage = async () => {
        if (!loading) {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b2bd88d5ce5e168ce72a6d589ceab4a5&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=18&with_original_language=ko&first_air_date_year=&page=${page + 1}`);
                const apiResult = res.data;
                let updatedTitles = data.concat(apiResult.results);
                updatedTitles = Array.from(new Set(updatedTitles.map((title) => title.id))).map((id) =>
                    updatedTitles.find((title) => title.id === id)
                );
                setData(updatedTitles);
                setPage((prevPage) => prevPage + 1);
                handleSearch(searchQuery, true);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    };

    const displayData = searchQuery !== "" ? queryTitles : data;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Explore KDramas</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search KDramas"
                    placeholderTextColor="#A3A3A3"
                    onChangeText={(text) => handleSearch(text, false)}
                    onSubmitEditing={() => handleSearch(searchQuery, false)}
                />
                {displayData.length > 0 && (
                    <FlatList
                        data={displayData}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={nextPage}
                        onEndReachedThreshold={0.5}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.id.toString()}
                                onPress={() => navigation.navigate('KDramaDetails', { item })}
                            >
                                <Card item={item} />
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#A3A3A3" /> : null}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#161618', 
    },
    header: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        width: '80%',
        borderColor: '#A3A3A3',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        borderRadius: 20,
    },
});

export default KDramaScreen;
