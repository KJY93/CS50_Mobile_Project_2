import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { fetchMovies } from '../api';
import Row from '../Row';
import PropTypes from 'prop-types';

const renderItem = onSelect => ({ item }) => <Row onSelect={onSelect} {...item} />

export default class SearchScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }),
    }

    state = {
        page: 0,
        query: '',
        results: null,
        totalResultCount: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query.trim() !== this.state.query.trim() && this.state.query.length > 1) {
            this.searchMovies(1)
        }
    }

    searchMovies = async (page) => {
        try {
            const result = await fetchMovies(page, this.state.query.trim());

            if (this.state.query.trim() !== result.query.trim()) return

            // loading of 1st page
            if (page === 1) {
                this.setState({
                    query: result.query.trim(),
                    results: result.Search,
                    totalResultCount: result.totalResults,
                })
            }
            // loading of 2nd and subsequent pages
            else {
                this.setState(prevState => prevState.query.trim() === result.query.trim()
                    ? { results: [...prevState.results, ...result.Search] }
                    : null
                )
            }
        }
        catch (err) {
            const errMessage = err.message;

            this.setState(
                { message: errMessage, results: null, totalResultCount: null }
            );
        }
    }

    handleFetchMore = () => {
        if (this.state.totalResultCount <= 10 * this.state.page) return;

        this.setState(prevState => ({ page: prevState.page + 1 }),
            () => { this.searchMovies(this.state.page) }
        );

    }

    handleMovieTitleUpdateQuery = (query) => {
        this.setState({ query, page: 1 });
    }

    handleMovieSelect = (id, title) => {
        this.props.navigation.navigate('MovieDetails', { id, title });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>Type in your search below:</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Search...'
                        style={styles.input}
                        value={this.state.query}
                        returnKeyType='done'
                        onChangeText={this.handleMovieTitleUpdateQuery}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.movieListContainer}>
                    {this.state.results
                        ? (
                            <FlatList
                                data={this.state.results}
                                renderItem={renderItem(this.handleMovieSelect)}
                                keyExtractor={item => item.imdbID}
                                onEndReached={this.handleFetchMore}
                                onEndReachedThreshold={0.5}
                            />
                        )
                        : <Text style={styles.error}>
                            {this.state.message ? this.state.message : "No Results"}
                        </Text>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    error: {
        textAlign: 'center',
        color: 'tomato',
    },
    header: {
        marginTop: 15,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        flex: 1,
        height: 42,
        paddingLeft: 7,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15,
    },
    movieListContainer: {
        flexDirection: 'row',
        flex: 1,
    }
});