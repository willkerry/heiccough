export const isUkOrIreland = () => {
  // Check if user is from UK or Ireland based on timezone or locale
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocale = navigator.language || (navigator as any).userLanguage;

  // UK/Ireland timezones
  const britishIslesTimezones = ["Europe/London", "Europe/Dublin"];
  // UK/Ireland locales
  const britishIslesLocales = ["en-GB", "en-IE", "ga-IE"];

  return (
    britishIslesTimezones.includes(userTimezone) ||
    britishIslesLocales.some((locale) => userLocale.startsWith(locale))
  );
};
