
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config';


const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.API_KEY as string;
export const supabaseClient = createClient(supabaseUrl, supabaseKey);