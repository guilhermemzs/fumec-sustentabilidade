import Image from 'next/image';
export function UniversitySignature() {
  return (
    <div className="university-signature">
      <Image
        src="/images/fumec-logo.png"
        alt="Universidade FUMEC"
        width={1735}
        height={505}
        sizes="240px"
      />
      <span>ENGENHARIA CIVIL · PROJETO DE EXTENSÃO 2026</span>
    </div>
  );
}
