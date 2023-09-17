export type SortField = 'title' | 'release_date' | 'vote_average';
export type SortOrder = 'asc' | 'desc';

export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
};

