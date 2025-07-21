import supabase from "./supabaseClient";
import { ConcertEvent } from "@/types/Event";


export async function fetchEvents(city?: string):Promise<ConcertEvent[]> {

    let query = supabase.from('events').select('*')

    if (city) {
        query = query.eq('city', city)
    }
    
    const {data, error} = await query;

    if (error) {
        console.error("Superbase error:", error.message)
        return [];
    }

    return data || []

}