export type ContactFormValues = {
  nome: string;
  email: string;
  oggetto: string;
  message: string;
  sourcePage: string;
  website?: string;
};

export const ErrorMessage = ({ message, id }: { message?: string; id?: string }) => {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-red-500">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
};

export const fieldClass = (hasError?: boolean) =>
  `field-shell transition-all ${hasError ? 'border-red-300 bg-red-50 focus:ring-red-200' : ''}`;
