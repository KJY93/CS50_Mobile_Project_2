import React, { useState, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchMovieDetails } from './MovieDetailsApi';
import PropTypes from 'prop-types';

const IMG_MARGIN = 10

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: IMG_MARGIN,
        alignItems: 'stretch',
    },
    movieInfo: {
        marginTop: 12,
    },
    title: {
        marginTop: 15,
        fontSize: 21,
        fontWeight: 'bold',
    },
    plot: {
        fontStyle: 'italic',
    },
    row: {
        marginBottom: 15,
    },
    rowHeader: {
        fontWeight: 'bold',
    }
})

const MovieDetails = ({ navigation, route }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [hasErrorMessage, setErrorsMessage] = useState(null);

    const window = Dimensions.get('window')
    const width = window.width;
    const height = window.height;
    const imgWidth = Math.min(height, width) - (2 * IMG_MARGIN)

    async function getMovieData() {
        try {
            const res = await fetchMovieDetails(route.params.id);
            setMovieDetails(res);
        }
        catch (err) {
            const errMessage = err.message;
            setErrorsMessage(errMessage);
        }
    }

    useEffect(() => {
        getMovieData();
    }, [])

    // loadFallBack((prevState) => ({
    //     ...prevState,
    //     Poster: 'https://via.placeholder.com/300x300?text=Image+Not+Available'
    // }));

    const loadFallBack = () => {
        setMovieDetails((prevState) => ({
            ...prevState,
            Poster: 'https://via.placeholder.com/300x300?text=Image+Not+Available'
        }))
    }

    if (movieDetails) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Image
                        source={{ uri: movieDetails.Poster }}
                        style={{ width: imgWidth, height: imgWidth }}
                        onError={() => loadFallBack()}
                    />

                    <Text style={styles.title}>{movieDetails.Title}</Text>
                    <Text>{movieDetails.Rated} | {movieDetails.Runtime} | {movieDetails.Genre} </Text>

                    <View style={styles.movieInfo}>
                        <Text style={styles.rowHeader}>Summary:</Text><Text style={[styles.plot, styles.row]}>{movieDetails.Plot}</Text>
                        <Text style={styles.rowHeader}>Director:</Text><Text style={styles.row}>{movieDetails.Director}</Text>
                        <Text style={styles.rowHeader}>Writers:</Text><Text style={styles.row}>{movieDetails.Writer}</Text>
                        <Text style={styles.rowHeader}>Stars:</Text><Text style={styles.row}>{movieDetails.Actors}</Text>
                        <Text style={styles.rowHeader}>Ratings:</Text><Text style={styles.row}>{movieDetails.imdbRating} / 10.0 ({movieDetails.imdbVotes} votes)</Text>
                        <Text style={styles.rowHeader}>Language:</Text><Text style={styles.row}>{movieDetails.Language}</Text>
                        <Text style={styles.rowHeader}>Released:</Text><Text style={styles.row}>{movieDetails.Released}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    if (hasErrorMessage) {
        return <Text>{hasErrorMessage}</Text>
    }

    return <Text>Loading...</Text>
}

MovieDetails.propTypes = {
    route: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    })
}

export default MovieDetails