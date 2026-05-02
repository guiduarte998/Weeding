import InviteSubpageShell from "@/components/InviteSubpageShell";
import RSVPForm from "@/components/RSVPForm";

export default function ConfirmacaoPage() {
  return (
    <InviteSubpageShell
      title="Confirmação"
      eyebrow="RSVP"
      lede="Adoraríamos contar com você nesse dia. Preencha o formulário abaixo para nos avisar se poderá comparecer."
    >
      <RSVPForm inviteTheme />
    </InviteSubpageShell>
  );
}
