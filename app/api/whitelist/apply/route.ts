import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { address, twitterHandle } = await request.json();

    if (!address || !twitterHandle) {
      return NextResponse.json(
        { error: 'Address and Twitter handle are required' },
        { status: 400 }
      );
    }

    // Check if address already exists
    const { data: existing } = await supabase
      .from('whitelist')
      .select('address')
      .ilike('address', address.toLowerCase())
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'Address already registered' },
        { status: 400 }
      );
    }

    // Insert new application
    const { data, error } = await supabase
      .from('whitelist')
      .insert([
        {
          address: address.toLowerCase(),
          twitter_handle: twitterHandle,
          access_granted: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error applying to whitelist:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        address: data.address,
        twitterHandle: data.twitter_handle,
        accessGranted: data.access_granted
      }
    });
  } catch (error) {
    console.error('Error applying to whitelist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 