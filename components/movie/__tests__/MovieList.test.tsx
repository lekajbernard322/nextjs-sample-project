import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import MovieList from "../MovieList";
import '@testing-library/jest-dom';

describe("<MovieList />", () => {
    const mockOnSortChange = jest.fn();
    const mockToggleFavorite = jest.fn();
    const mockMovies = [
        {
            id: 1,
            title: "Movie 1",
            vote_average: 8.2,
            release_date: "2020-10-10",
            poster_path: "/movie1.jpg",
        },
        {
            id: 2,
            title: "Movie 2",
            vote_average: 9.2,
            release_date: "2021-10-10",
            poster_path: "/movie2.jpg",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly", () => {
        const { getByText } = render(
            <MovieList
                movies={mockMovies}
                favorites={[]}
                sortedField="title"
                sortOrder="asc"
                onSortChange={mockOnSortChange}
                toggleFavorite={mockToggleFavorite}
            />
        );

        // Check movie titles
        expect(getByText("Movie 1")).toBeInTheDocument();
        expect(getByText("Movie 2")).toBeInTheDocument();
    });

    it("sorts by different fields when headers clicked", () => {
        const { getByText } = render(
            <MovieList
                movies={mockMovies}
                favorites={[]}
                sortedField="title"
                sortOrder="asc"
                onSortChange={mockOnSortChange}
                toggleFavorite={mockToggleFavorite}
            />
        );

        fireEvent.click(getByText("Title"));
        expect(mockOnSortChange).toHaveBeenCalledWith("title");

        fireEvent.click(getByText("Rating"));
        expect(mockOnSortChange).toHaveBeenCalledWith("vote_average");

        fireEvent.click(getByText("Release"));
        expect(mockOnSortChange).toHaveBeenCalledWith("release_date");
    });

    it("toggles favorite when star icon clicked", () => {
        const { getByTestId, getAllByRole } = render(
            <MovieList
                movies={mockMovies}
                favorites={[]}
                sortedField="title"
                sortOrder="asc"
                onSortChange={mockOnSortChange}
                toggleFavorite={mockToggleFavorite}
            />
        );

        const rows = getAllByRole("row");
        fireEvent.click(within(rows[1]).getByRole("button")); // Use the star icon for clicking
        expect(mockToggleFavorite).toHaveBeenCalledWith(1);

        fireEvent.click(within(rows[2]).getByRole("button")); // Use the star icon for clicking
        expect(mockToggleFavorite).toHaveBeenCalledWith(2);
    });
});