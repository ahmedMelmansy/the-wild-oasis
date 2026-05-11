import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://itwkxrfvejlpaxxfwptu.supabase.co"

export const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0d2t4cmZ2ZWpscGF4eGZ3cHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NzY0MzUsImV4cCI6MjA5MzM1MjQzNX0.eobRA-zmQPeJOONVpEn3HjKkQaIeYujHY9T-D-7W4Pw"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase