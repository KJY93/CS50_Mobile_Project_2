export const fetchMovieDetails = async(id) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=2edf0612&i=${id}`);

    if (response.ok) {
        const results = await response.json();
        return results;
    }

    const errMessage = JSON.parse(await response.text()).Error;
    throw new Error(errMessage);
}