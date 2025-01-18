// supabase.js
import { createClient } from '@supabase/supabase-js';

// Configuración de tu proyecto en Supabase
const supabaseUrl = 'https://bkbdolijonlubpgidozk.supabase.co'; // Cambia esta URL por la tuya
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrYmRvbGlqb25sdWJwZ2lkb3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNDY4MDgsImV4cCI6MjA1MjcyMjgwOH0.xT39JTIect8VmsYF2kccAyyrXz5AHNI-aq6Cr4nt1j0'; // Sustituye con tu clave anon

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
