/**
The existing Supabase client is great for client-side components — 
for instance, inside hooks or form handlers.
But for server components in App Router, Supabase recommends using 
createServerComponentClient() to:
Respect the request context (cookies, headers)
Support future features like RLS (row-level security)
Handle session state securely if auth is added
 */

import { Artist } from "@/types/Artist"
import { ConcertEvent } from "@/types/Event"
import supabase from "./supabaseClient"

export async function fetchArtistAndEventsByID(id: string): Promise<{events:ConcertEvent[], artist:Artist|null}> {

    const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('id', parseInt(id))
    .single()

    if (artistError || !artist) return { artist: null, events: [] }

    const { data: events } = await supabase
    .from('events')
    .select('*')
    .ilike('artist', `%${artist.name}%`)

  return { artist, events: events || [] }
}