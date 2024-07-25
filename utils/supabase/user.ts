import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const getCurrentUser = async () => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/')
    }
   return user;
};