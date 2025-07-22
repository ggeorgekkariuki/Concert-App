import supabase from "./supabaseClient";
import { Artist } from "@/types/Artist";


export async function fetchArtist(artist: string) {
    
    let query = supabase.from('artists').select('*')

    if (artist) {
        query = query.eq('name', artist)
    }
    
    const {data, error} = await query;

    
    console.log("The query is ", query);
    console.log("The data is ", data);
    console.log("The data type is ", typeof(data));
    console.log("The error is ", error)

    if (error) {
        console.error("Superbase error:", error.message)
        return []
    }

    return data || [];

}