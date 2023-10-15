export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          artist_id: number
          artist_name: string
          biography: string | null
          contact_email: string | null
          contact_phone: string | null
          discography: Json | null
          genre: string | null
          image_url: string | null
          social_media_links: Json | null
        }
        Insert: {
          artist_id?: number
          artist_name: string
          biography?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          discography?: Json | null
          genre?: string | null
          image_url?: string | null
          social_media_links?: Json | null
        }
        Update: {
          artist_id?: number
          artist_name?: string
          biography?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          discography?: Json | null
          genre?: string | null
          image_url?: string | null
          social_media_links?: Json | null
        }
        Relationships: []
      }
      licensing_agreements: {
        Row: {
          agreement_id: number
          license_price: number | null
          license_terms: string | null
          song_id: number | null
          user_id: number | null
        }
        Insert: {
          agreement_id?: number
          license_price?: number | null
          license_terms?: string | null
          song_id?: number | null
          user_id?: number | null
        }
        Update: {
          agreement_id?: number
          license_price?: number | null
          license_terms?: string | null
          song_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "licensing_agreements_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "songs"
            referencedColumns: ["song_id"]
          }
        ]
      }
      songs: {
        Row: {
          album: string | null
          artist_id: number | null
          cover_art_url: string | null
          duration: unknown | null
          genre: string | null
          keywords: string[] | null
          licensing_options: Json | null
          lyrics: string | null
          music_file_url: string | null
          release_year: number | null
          sample_preview_url: string | null
          song_id: number
          title: string
        }
        Insert: {
          album?: string | null
          artist_id?: number | null
          cover_art_url?: string | null
          duration?: unknown | null
          genre?: string | null
          keywords?: string[] | null
          licensing_options?: Json | null
          lyrics?: string | null
          music_file_url?: string | null
          release_year?: number | null
          sample_preview_url?: string | null
          song_id?: number
          title: string
        }
        Update: {
          album?: string | null
          artist_id?: number | null
          cover_art_url?: string | null
          duration?: unknown | null
          genre?: string | null
          keywords?: string[] | null
          licensing_options?: Json | null
          lyrics?: string | null
          music_file_url?: string | null
          release_year?: number | null
          sample_preview_url?: string | null
          song_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_artist"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["artist_id"]
          },
          {
            foreignKeyName: "songs_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["artist_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
