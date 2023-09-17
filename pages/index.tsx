import React, {FunctionComponent, useEffect, useState} from "react";
import axios from 'axios';
import {API_KEY, BASE_DATA_URL} from "../config/consts";
import MovieList from "../components/movie/MovieList";
import {Movie, SortField, SortOrder} from "../@types/movie";

type HomeProps = {
    movies: Movie[];
};

const Home: FunctionComponent<HomeProps> = ({ movies }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const [sortedData, setSortedData] = useState<Movie[]>(movies);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [sortedField, setSortedField] = useState<SortField>('vote_average');

    const handleSort = (field: SortField) => {
        if (sortedField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedField(field);
            setSortOrder('asc');
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
    };

    useEffect(() => {
        const favoritesFromMemory = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(favoritesFromMemory);
    }, []);

    const getNewFavorites = (id: number) => {
        if (favorites.includes(id)) {
            return favorites.filter(favId => favId !== id);
        } else {
            return [...favorites, id];
        }
    };

    const toggleFavorite = (id: number) => {
        const newFavorites = getNewFavorites(id);

        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    return (
        <div>
            <h1>Top Rated Movies</h1>
            <MovieList onSortChange={handleSort} sortedField={sortedField} sortOrder={sortOrder}
                       movies={sortedData} favorites={favorites} toggleFavorite={toggleFavorite}/>
        </div>
    );
};

export const getServerSideProps = async () => {
    const allMovies = [];
    const totalPages = 25; // for 500 movies

    for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(BASE_DATA_URL, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page,
            },
        });
        allMovies.push(...response.data.results.map(({id, title, poster_path, release_date, vote_average}) => ({
            id, title, poster_path, release_date, vote_average
        })));
    }

    return {
        props: {
            movies: allMovies,
        },
    };
};

export default Home;
