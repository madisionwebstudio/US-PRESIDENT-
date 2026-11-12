// Hand-drawn 24×24 line icons. Rendered inline (no icon font / library).
const paths = {
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.3 7.3a1 1 0 0 1-1.4 0z"/><circle cx="8" cy="8" r="1.6"/>',
  ledger: '<path d="M3 20.5h18M4.5 17.5h15M6 17.5v-7M10 17.5v-7M14 17.5v-7M18 17.5v-7M3 10.5h18L12 4z"/>',
  dove: '<path d="M4 20c4.5-4.5 9-9 16-16"/><path d="M8.5 15.5c-.3-2.6.8-4.6 3.2-5.4.4 2.5-.7 4.5-3.2 5.4zM8.5 15.5c-2.5.7-4.5 0-5.6-2 2.4-.8 4.4-.2 5.6 2z"/><path d="M13.5 10.5c-.3-2.6.8-4.6 3.2-5.4.4 2.5-.7 4.5-3.2 5.4zM13.5 10.5c-2.5.7-4.5 0-5.6-2 2.4-.8 4.4-.2 5.6 2z"/>',
  house: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  wheat: '<path d="M12 21.5V7"/><path d="M12 7c-1.9-.9-2.9-2.6-2.9-4.6 1.9.9 2.9 2.6 2.9 4.6zM12 7c1.9-.9 2.9-2.6 2.9-4.6-1.9.9-2.9 2.6-2.9 4.6z"/><path d="M12 12c-2.2-.6-3.6-2.1-3.9-4.2 2.2.6 3.6 2.1 3.9 4.2zM12 12c2.2-.6 3.6-2.1 3.9-4.2-2.2.6-3.6 2.1-3.9 4.2z"/><path d="M12 17c-2.2-.6-3.6-2.1-3.9-4.2 2.2.6 3.6 2.1 3.9 4.2zM12 17c2.2-.6 3.6-2.1 3.9-4.2-2.2.6-3.6 2.1-3.9 4.2z"/>',
  cross: '<path d="M9.2 3.5h5.6v5.7h5.7v5.6h-5.7v5.7H9.2v-5.7H3.5V9.2h5.7z"/>',
  scales: '<path d="M12 3.5v17M7.5 20.5h9M4.5 7h15M12 3.5 12 7"/><path d="M6.5 7 3.5 13.5a3 3 0 0 0 6 0zM17.5 7l-3 6.5a3 3 0 0 0 6 0z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5M12 3.5C9.6 5.9 8.4 8.7 8.4 12s1.2 6.1 3.6 8.5"/>',
  leaf: '<path d="M4.5 19.5C4.5 10.5 10 4.5 19.5 4.5c0 9.5-6 15-15 15z"/><path d="M4.5 19.5 14 10"/>',
  heart: '<path d="M12 20s-7.5-4.6-8.9-9.4A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 8.9 3.4C19.5 15.4 12 20 12 20z"/>',
  arrow: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 6.5 8 6.5 8-6.5"/>',
  phone: '<path d="M6.6 3.5H9l1.4 4-2 1.4a10.6 10.6 0 0 0 6.6 6.6l1.4-2 4 1.4v2.4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  star: '<path d="m12 4 2.3 5 5.2.5-3.9 3.5 1.1 5.2L12 15.6l-4.7 2.6 1.1-5.2-3.9-3.5 5.2-.5z"/>',
  flag: '<path d="M5.5 21V4M5.5 4.5h11l-2 3.5 2 3.5h-11"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

// Policy icon map (content uses semantic names)
export const policyIcon = { tag: 'tag', ledger: 'ledger', dove: 'dove', house: 'house', wheat: 'wheat', cross: 'cross', scales: 'scales', handshake: 'globe', leaf: 'leaf', hands: 'heart' };
