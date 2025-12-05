import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// REPLACE THESE WITH YOUR COPIED VALUES
const SUPABASE_URL = 'https://lhoeeiophgthbqfkvnrk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_clKNmin0Cmu_1-TOBqjAow_Pabt-ycH';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);