export default {
  input: ['src/**/*.{js,jsx}', 'backend/**/*.js'],
  output: './locales/$LOCALE/$NAMESPACE.json',
  locales: ['en', 'es', 'pt'],
  namespaceSeparator: ':',
  keySeparator: '.',
}
