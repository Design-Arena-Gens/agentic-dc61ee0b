'use client';

import DashboardHeader from '@/components/DashboardHeader';
import KpiBoard from '@/components/KpiBoard';
import WorkflowOrchestrator from '@/components/WorkflowOrchestrator';
import CampaignTimeline from '@/components/CampaignTimeline';
import AutomationMatrix from '@/components/AutomationMatrix';
import AssistantConsole from '@/components/AssistantConsole';
import ContentOpsPanel from '@/components/ContentOpsPanel';
import { campaigns } from '@/lib/data';
import { useMemo, useState } from 'react';

export default function Home() {
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id ?? 'pulse');
  const campaign = useMemo(
    () => campaigns.find((item) => item.id === campaignId) ?? campaigns[0],
    [campaignId]
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10">
      <DashboardHeader
        campaigns={campaigns}
        activeCampaignId={campaignId}
        onSelectCampaign={setCampaignId}
      />

      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <KpiBoard metrics={campaign.metrics} />
        <WorkflowOrchestrator
          blueprint={campaign.workflow}
          stakeholders={campaign.stakeholders}
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_1fr]">
        <ContentOpsPanel
          playbook={campaign.playbook}
          briefs={campaign.briefs}
          contentIdeas={campaign.contentIdeas}
        />
        <AutomationMatrix automations={campaign.automations} />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_1fr]">
        <CampaignTimeline timeline={campaign.timeline} />
        <AssistantConsole
          campaign={campaign}
          onCampaignSwitch={(id) => setCampaignId(id)}
        />
      </section>
    </main>
  );
}
