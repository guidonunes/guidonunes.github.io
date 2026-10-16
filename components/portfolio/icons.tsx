export function Icon({ name }: { name: string }) {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
export function IconDefinitions() {
  return (
    <svg
      className="icon-defs"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 19 19 5M5 5h14v14" />
        </symbol>
        <symbol id="i-down" viewBox="0 0 24 24">
          <path d="M12 4v16m-6-6 6 6 6-6" />
        </symbol>
        <symbol id="i-home" viewBox="0 0 24 24">
          <path d="m3 10 9-7 9 7v10H3ZM9 20v-7h6v7" />
        </symbol>
        <symbol id="i-work" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="14" rx="3" />
          <path d="M8 7V3h8v4M3 12c5 4 13 4 18 0M12 12v4" />
        </symbol>
        <symbol id="i-about" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="4" />
          <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m3 7 9 7 9-7" />
        </symbol>
        <symbol id="i-theme" viewBox="0 0 24 24">
          <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="m6 6 12 12M6 18 18 6" />
        </symbol>
        <symbol id="i-copy" viewBox="0 0 24 24">
          <rect x="8" y="8" width="12" height="13" rx="2" />
          <path d="M15 8V3H3v13h5" />
        </symbol>
      </defs>
    </svg>
  );
}
