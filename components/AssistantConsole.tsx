import { useState } from 'react';
import type { Campaign } from '@/lib/data';
import {
  PaperAirplaneIcon,
  SparklesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

type Props = {
  campaign: Campaign;
  onCampaignSwitch: (id: string) => void;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
  campaignId?: string;
};

export default function AssistantConsole({
  campaign,
  onCampaignSwitch
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! I am the Bharat Life Care social AI. Ask me to plan campaigns, adjust workflows, or orchestrate escalations.'
    }
  ]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState('');

  async function handleSend() {
    if (!input.trim() || pending) return;
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      campaignId: campaign.id
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setPending(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.content,
          campaignId: campaign.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch agent response');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          campaignId: data.campaign
        }
      ]);

      if (data.campaign && data.campaign !== campaign.id) {
        onCampaignSwitch(data.campaign);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I had trouble reaching the orchestration layer. Please retry in a moment.'
        }
      ]);
      console.error(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="glass-panel flex h-full flex-col rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Agent Console
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Orchestrate campaigns, compliance, and optimizations with Bharat
            Life Care&apos;s social AI lead.
          </p>
        </div>
        <SparklesIcon className="h-6 w-6 text-primary-500" />
      </header>

      <div className="mt-5 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
              message.role === 'assistant'
                ? 'bg-primary-50 text-primary-900'
                : 'ml-auto bg-slate-900 text-white'
            }`}
          >
            <pre className="whitespace-pre-wrap font-sans">
              {message.content}
            </pre>
            {message.campaignId && (
              <p className="mt-2 text-xs uppercase tracking-wide opacity-70">
                Campaign · {message.campaignId}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <ArrowPathIcon className="h-4 w-4" />
          Ask the agent
        </label>
        <div className="flex items-center gap-2">
          <textarea
            rows={3}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 shadow-inner transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="e.g. Plan a compliance-safe reel for World Heart Day with a paid boost strategy."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSend();
              }
            }}
          />
          <button
            onClick={() => void handleSend()}
            disabled={pending}
            className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-primary-600 px-5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-slate-500">
          The agent proactively aligns to workflows, automations, and KPI
          guardrails for Bharat Life Care.
        </p>
      </div>
    </section>
  );
}
