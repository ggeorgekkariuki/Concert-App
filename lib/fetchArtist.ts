import supabase from "./supabaseClient";
import { ConcertEvent } from "@/types/Event";


export async function fetchArtistEvents(artist?: string):Promise<ConcertEvent[]> {

    let query = supabase.from('events').select('*')

    if (artist) {
        query = query.eq('artist', artist)
    }
    
    const {data, error} = await query;

    if (error) {
        console.error("Superbase error:", error.message)
        return [];
    }

    return data || []

}