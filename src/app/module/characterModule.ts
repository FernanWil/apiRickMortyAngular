export interface info{
    count: number;
    next: string;
    pages: number;
}

export interface characterModule {
    id:number;
    name: string;
    status: string;
    image: string;
    species: string;
    gender: string;
    isFavorite?: boolean;
}

export interface apiResponse{
    info: info
    results: characterModule []
}