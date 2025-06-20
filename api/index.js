import axios from 'axios';

const API_KEY = 'f1b0dc700c5788eb3c6ff31f30981996';
const ENDPOINT = 'https://api.themoviedb.org/3';
export const POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

export const fetchTrending = async () => {
    const response = await axios.get(ENDPOINT+`/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
}

export const fetchUpcoming = async () => {
    const response = await axios.get(ENDPOINT+`/movie/upcoming?api_key=${API_KEY}`);
    return response.data.results;
}

export const fetchTopRated = async () => {
    const response = await axios.get(ENDPOINT+`/movie/top_rated?api_key=${API_KEY}`);
    return response.data.results;
}

export const fetchDetail = async (id) => {
    const response = await axios.get(ENDPOINT+`/movie/${id}?api_key=${API_KEY}`);
    return response.data;
}

export const fetchCredits = async (id) => {
    const response = await axios.get(ENDPOINT+`/movie/${id}/credits?api_key=${API_KEY}`);
    return response.data.cast;
}

export const fetchSimilar = async (id) => {
    const response = await axios.get(ENDPOINT+`/movie/${id}/similar?api_key=${API_KEY}`);
    return response.data.results;
}

export const fetchPerson = async (id) => {
    const response = await axios.get(ENDPOINT+`/person/${id}?api_key=${API_KEY}`);
    return response.data;
}

export const fetchPersonMovie = async (id) => {
    const response = await axios.get(ENDPOINT+`/person/${id}/movie_credits?api_key=${API_KEY}`);
    return response.data.cast;
}

export const searchMovie = async (params) => {
    const response = await axios.get(ENDPOINT+`/search/movie?api_key=${API_KEY}`,{
        params
    });
    return response.data.results;
}