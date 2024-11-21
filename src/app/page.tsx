import { KafkaConnectVisualizerComponent } from "@/components/kafka-connect-visualizer";
import { getKafkaConnectors } from "@/lib/api/kafka-connect";

export const dynamic = "force-dynamic";

export default async function Home() {
  const connector = await getKafkaConnectors();

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-5xl font-[family-name:var(--font-geist-sans)]">
      <main>
        <KafkaConnectVisualizerComponent connectors={connector} />
      </main>
    </div>
  );
}
