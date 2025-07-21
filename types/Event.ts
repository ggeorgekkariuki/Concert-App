// Typescript detailing the structure of the object and
// avoids the app from defining the returned object as any

export type ConcertEvent = {
    id: number;
    title: string;
    date: string;
    venue: string;
    city: string;
    country: string;
    genre: string;
    artist: string;
}