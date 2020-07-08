import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    poster: {
        width: 150,
        height: 150,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    movieDetailsContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    yearAndType: {
        marginBottom: 18,
        textAlign: 'center',
    },
});

class Row extends React.Component {
    static propTypes = {
        imdbID: PropTypes.string,
        Title: PropTypes.string,
        Year: PropTypes.string,
        Type: PropTypes.string,
        Poster: PropTypes.string,
    }

    state = {
        image: this.props.Poster
    }

    loadFallBack() {
        this.setState({
            image: 'https://via.placeholder.com/300x300?text=Image+Not+Available'
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onSelect(this.props.imdbID, this.props.Title)}>
                <View style={styles.container}>
                    <View>
                        <Image
                            source={{ uri: this.state.image }}
                            style={styles.poster}
                            onError={() => this.loadFallBack()}
                        />
                    </View>
                </View>

                <View style={styles.movieDetailsContainer}>
                    <Text style={styles.title}>{this.props.Title}</Text>
                    <Text style={styles.yearAndType}>{this.props.Year} ({this.props.Type})</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Row

