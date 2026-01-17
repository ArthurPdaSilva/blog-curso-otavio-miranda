import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

/*
  Notas de data:
  - Usa `date-fns` com locale `ptBR` para formatação consistente.
  - Exemplos: `formatDateTime('2025-01-01T12:00:00')` => `01/01/2025 às 12h00`.
  - `formatDistanceToNow(date, { locale: ptBR })` é útil para mostrar tempo relativo.
*/

export function formatDateTime(rowDate: string): string {
  const date = new Date(rowDate);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatHour(timestamp: number): string {
  const date = new Date(timestamp);
  return format(date, "HH:mm:ss", {
    locale: ptBR,
  });
}

export function formatRelativeDateTime(rowDate: string): string {
  const date = new Date(rowDate);
  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}
