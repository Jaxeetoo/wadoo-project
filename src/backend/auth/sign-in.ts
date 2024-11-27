import { createClient, AuthResponse, AuthError  } from '@supabase/supabase-js'

export async function SignIn(email: string, password: string): Promise<AuthResponse>
{
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY as string;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error('Error signing in:', error.message);
    }
    return { data, error } as AuthResponse;

  } catch {

    return {
      data: { user: null, session: null},
      error: { 
        message: 'Unexpected error occurred during sign-in',
        status: 500 // Use a default HTTP status code for server errors
      } as AuthError,
    };
  }
}