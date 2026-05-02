/** Remove tudo que não for dígito (pontos, traços, espaços). */
export function cpfDigitsOnly(value: string): string {
  return (value ?? "").replace(/\D/g, "");
}

/** true se tiver exatamente 11 dígitos (não valida dígitos verificadores). */
export function isCpfLengthValid(digits: string): boolean {
  return digits.length === 11;
}
