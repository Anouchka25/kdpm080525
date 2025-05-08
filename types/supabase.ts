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
      profiles: {
        Row: {
          id: string
          phone_number: string
          whatsapp: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          phone_number: string
          whatsapp?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          phone_number?: string
          whatsapp?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
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
  }
}