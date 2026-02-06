import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://awicwbolytrwodzqwacp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3aWN3Ym9seXRyd29kenF3YWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzc0MjgsImV4cCI6MjA4NTkxMzQyOH0.G1HsqvaBsU35y4GFAqKSuAmgNq7f5QedfDPqZtxnyYI'

export const supabase = createClient(supabaseUrl, supabaseKey)