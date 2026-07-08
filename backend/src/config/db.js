import {createClient} from '@supabase/supabase-js'

const db = createClient(process.env.VITE_SUPABASE_URL
  ,process.env.VITE_SUPABASE_PUBLISHABLE_KEY);


export default db