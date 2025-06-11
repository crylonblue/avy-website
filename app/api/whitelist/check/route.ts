import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('whitelist')
      .select('address, twitter_handle, access_granted')
      .ilike('address', address.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error('Error checking whitelist:', error);
      return NextResponse.json(
        { error: 'Failed to check whitelist' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      isWhitelisted: !!data,
      twitterHandle: data?.twitter_handle || null,
      accessGranted: data?.access_granted || false
    });
  } catch (error) {
    console.error('Error checking whitelist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 