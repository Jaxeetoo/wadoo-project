import { createClient } from '@supabase/supabase-js'
// import { supabaseClient } from '../client'

export async function SignIn(email: string, password: string): Promise<any>
{
  const supabaseUrl = process.env.SUPABASE_URL as string;
  const supabaseKey = process.env.API_KEY as string;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log(data);
    if (error) console.log(error);
    return data;
  } catch(error: any) {
    console.error(error);
  }
}