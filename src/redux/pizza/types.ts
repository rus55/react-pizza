export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: string[];
    rating: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type SearchPizzaParams = {
    sortBy: string,
    order: string,
    search: string,
    category: string,
    currentPage: string
}

export interface pizzaSliceState {
    items: Pizza[];
    status: Status
}

