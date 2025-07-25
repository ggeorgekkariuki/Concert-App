import supabase from "./supabaseClient";
import { ConcertEvent } from "@/types/Event";


export async function fetchEvents(city?: string) {

    let query = supabase.from('events').select('*')

    if (city) {
        query = query.ilike('city', `%${city}%`)
    }
    
    const {data, error} = await query;

    if (error) {
        console.error("Superbase error:", error.message)
        return [];
    }

    return data || []

}