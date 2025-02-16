
import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: quotes, error } = await supabase.from('quotes').select('*');

  if (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to load quotes' }, { status: 500 });
  }

  return NextResponse.json(quotes);
}

