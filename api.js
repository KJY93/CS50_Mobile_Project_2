export const fetchMovies = async (page, query) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=2edf0612&s=${query}&page=${page}`);
    if (response.ok) {
        const results = await response.json();
        if (results.Response === 'True') {
            return ({ query, ...results });
        }
        else {
            throw new Error('No Results');
        }
    }

    const errMessage = JSON.parse(await response.text()).Error;
    throw new Error(errMessage);
}