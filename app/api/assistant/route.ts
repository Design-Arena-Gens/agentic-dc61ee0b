import { generateAssistantResponse } from '@/lib/assistant';
import { campaigns } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const message: string = body?.message ?? '';
  const campaignId: string = body?.campaignId;

  if (!message || typeof message !== 'string') {
    return NextResponse.json(
      { error: 'Message is required.' },
      { status: 400 }
    );
  }

  const campaign =
    campaigns.find((item) => item.id === campaignId) ?? campaigns[0];

  const result = generateAssistantResponse({
    message,
    campaign
  });

  return NextResponse.json({
    reply: result.reply,
    focus: result.focus,
    campaign: campaign.id
  });
}
