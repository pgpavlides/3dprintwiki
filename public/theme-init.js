// This script should be included inline in the <head> to avoid FOUC
// On page load or when changing themes
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
);
