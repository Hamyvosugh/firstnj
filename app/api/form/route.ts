import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { name, email, message } = await req.json();

  // Basic validation
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
  }

  // Insert data into Supabase
  const { error } = await supabase.from('submissions').insert([{ name, email, message }]);

  if (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Form submitted successfully!' });
}