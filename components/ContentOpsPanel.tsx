import type { Brief, ContentIdea, PlaybookItem } from '@/lib/data';
import {
  PencilSquareIcon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

type Props = {
  playbook: PlaybookItem[];
  briefs: Brief[];
  contentIdeas: ContentIdea[];
};

const statusCopy: Record<
  Brief['status'],
  { label: string; tone: string; accent: string }
> = {
  draft: {
    label: 'Draft',
    tone: 'text-primary-600',
    accent: 'bg-primary-100'
  },
  'in-review': {
    label: 'In review',
    tone: 'text-amber-600',
    accent: 'bg-amber-100'
  },
  approved: {
    label: 'Approved',
    tone: 'text-emerald-600',
    accent: 'bg-emerald-100'
  }
};

export default function ContentOpsPanel({
  playbook,
  briefs,
  contentIdeas
}: Props) {
  return (
    <section className="glass-panel rounded-3xl border border-slate-200 p-6">
      <header className="flex items-center gap-3">
        <PencilSquareIcon className="h-6 w-6 text-primary-500" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Content Ops Command
          </h2>
          <p className="text-sm text-slate-500">
            Strategy, briefs, and AI-first ideation stitched together for Bharat
            Life Care.
          </p>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <ClipboardDocumentCheckIcon className="h-4 w-4" />
            Narrative pillars
          </h3>
          <ul className="mt-3 space-y-3">
            {playbook.map((pillar) => (
              <li
                key={pillar.pillar}
                className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-primary-600">
                  {pillar.pillar}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {pillar.objective}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {pillar.narrative}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                  {pillar.ctas.map((cta) => (
                    <span
                      key={cta}
                      className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-600"
                    >
                      {cta}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <LightBulbIcon className="h-4 w-4" />
            AI ideation bursts
          </h3>
          <ul className="mt-3 space-y-3">
            {contentIdeas.map((idea) => (
              <li
                key={idea.id}
                className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-slate-500">
                  <span>{idea.channel}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                    {idea.format}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {idea.hook}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {idea.aiAssist}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase text-primary-500">
                  Pillar · {idea.pillar}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <ClipboardDocumentCheckIcon className="h-4 w-4" />
            Brief pipeline
          </h3>
          <ul className="mt-3 space-y-3">
            {briefs.map((brief) => (
              <li
                key={brief.id}
                className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {brief.title}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusCopy[brief.status].accent} ${statusCopy[brief.status].tone}`}
                  >
                    {statusCopy[brief.status].label}
                  </span>
                </div>
                <dl className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <div>
                    <dt>Due</dt>
                    <dd className="font-semibold text-slate-700">
                      {brief.due}
                    </dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd className="font-semibold text-slate-700">
                      {brief.owner}
                    </dd>
                  </div>
                  <div>
                    <dt>Channel</dt>
                    <dd className="font-semibold text-slate-700">
                      {brief.channel}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
