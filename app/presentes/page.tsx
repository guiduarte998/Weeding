import InviteSubpageShell from "@/components/InviteSubpageShell";
import GiftList from "@/components/GiftList";

export default function PresentesPage() {
  return (
    <InviteSubpageShell
      title="Lista de presentes"
      eyebrow="Com carinho"
      lede="Sua presença já é o maior presente. Se quiser nos mimar com algo a mais, deixamos algumas sugestões abaixo."
      contentLayout="wide"
    >
      <GiftList inviteTheme />
    </InviteSubpageShell>
  );
}
