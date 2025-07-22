import supabase from "./supabaseClient";
import { Artist } from "@/types/Artist";

// Fetch Artists By Genre

export async function fetchArtistsByGenre(genre?: string): Promise<Artist[]> {
    let query = supabase.from('artists').select('*');

    if (genre) {
        query = query.eq('genre', genre);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Fetch artists error:', error.message);
        return [];
    }

    return data || [];
}
