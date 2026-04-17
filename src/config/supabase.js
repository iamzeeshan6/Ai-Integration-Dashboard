import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://frsfskwkqsghovbmtxzm.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyc2Zza3drcXNnaG92Ym10eHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTczNjIsImV4cCI6MjA2MzU3MzM2Mn0.V7ATzy9WPoSPCaxuN7QyzAyFU9mb0d9u5A7Jhva2rKE'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);