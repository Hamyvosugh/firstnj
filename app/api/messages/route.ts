import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

// Fetch all messages
export async function GET() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase.from('submissions').select('*');

  if (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }

  return NextResponse.json(messages);
}

// Save a reply
export async function POST(req: Request) {
  const supabase = await createClient();
  const { id, reply } = await req.json();

  if (!id || !reply) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { error } = await supabase.from('submissions').update({ reply }).eq('id', id);

  if (error) {
    console.error('Error saving reply:', error);
    return NextResponse.json({ error: 'Failed to save reply' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Reply saved successfully!' });
}