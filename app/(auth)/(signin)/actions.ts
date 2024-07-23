'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod';
import { signInSchema } from '@/components/forms/user-auth-form';
import { createClient } from '@/utils/supabase/server'

export async function login(values: z.infer<typeof signInSchema>) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signInWithPassword({email: values.email,
    password: values.password})

  if (error) {
    return {
        success: false,
        message: error.message,
      };
  }

  return {
    success: true,
    message: 'Sign in successful',
  };
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}