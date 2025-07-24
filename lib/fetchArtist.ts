import supabase from "./supabaseClient";

export async function fetchArtist(artist: string) {
    
    let query = supabase.from('artists').select('*')

    if (artist) {
        query = query.ilike('name', `%${artist}%`)
    }
    
    const {data, error} = await query;

    if (error) {
        console.error("Superbase error:", error.message)
        return []
    }

    return data || [];

}