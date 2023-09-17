import React, {FunctionComponent} from "react";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import {BASE_IMAGE_URL} from "../../config/consts";
import {Movie, SortField, SortOrder} from "../../@types/movie";

type MovieListProps = {
    onSortChange: (newSort: SortField) => void,
    sortedField: SortField,
    sortOrder: SortOrder,
    movies: Movie[],
    favorites: number[],
    toggleFavorite: (id: number) => void
};

const MovieList: FunctionComponent<MovieListProps> = ({
    favorites,
    movies,
    onSortChange,
    sortOrder,
    sortedField,
    toggleFavorite
}) => (
    <Table>
        <thead>
        <tr>
            <th></th>
            <th onClick={() => onSortChange('title')} role="button">
                Title {sortedField === "title" && (sortOrder === "asc" ? <i className="fa fa-sort-up"/> :
                <i className="fa fa-sort-down"/>)}
            </th>
            <th onClick={() => onSortChange('vote_average')} role="button">
                Rating {sortedField === "vote_average" && (sortOrder === "asc" ?
                <i className="fa fa-sort-up"/> : <i className="fa fa-sort-down"/>)}
            </th>
            <th onClick={() => onSortChange('release_date')} role="button">
                Release {sortedField === "release_date" && (sortOrder === "asc" ?
                <i className="fa fa-sort-up"/> : <i className="fa fa-sort-down"/>)}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {movies?.map((movie) => (
            <tr key={movie.id}
                className={favorites?.includes(movie.id) ? "bg-info" : undefined}>
                <td><Image src={`${BASE_IMAGE_URL}${movie.poster_path}`} height={75} width={50} alt={movie.title}/>
                </td>
                <td>{movie.title}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.release_date}</td>
                <td><i onClick={() => toggleFavorite(movie.id)} className={`fa fa-star`} role="button"/></td>
            </tr>
        ))}
        </tbody>
    </Table>
);

export default MovieList;
