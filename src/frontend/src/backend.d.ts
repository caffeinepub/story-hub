import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Story {
    title: string;
    content: string;
    author: string;
    creationDate: Time;
    genre: Genre;
    isAIGenerated: boolean;
}
export enum Genre {
    thriller = "thriller",
    love = "love",
    historical = "historical",
    scienceFiction = "scienceFiction",
    horror = "horror",
    romance = "romance",
    fantasy = "fantasy"
}
export interface backendInterface {
    createStory(title: string, content: string, author: string, genre: Genre): Promise<void>;
    filterStoriesByGenre(genre: Genre): Promise<Array<Story>>;
    getStory(title: string): Promise<Story>;
    listAllStories(): Promise<Array<Story>>;
}
