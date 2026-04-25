import { whatsappUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function LandingStickyCta() {
  return (
    <div className="mobile-safe-bottom glass-panel fixed inset-x-3 bottom-3 z-40 rounded-[1.1rem] p-2 shadow-[var(--shadow-elevated)] md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild size="sm">
          <a href="#lead-capture">Demander mon offre</a>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <a
            href={whatsappUrl("Bonjour, je souhaite une offre rapide pour un sejour a Oulad Chmicha.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
