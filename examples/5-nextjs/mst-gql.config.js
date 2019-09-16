module.exports = {
  format: 'ts',
  input: 'http://localhost:3000/api/graphql',
  outDir: 'src/models',
  roots: ['Todo'],
  excludes: ['CacheControlScope', 'Query', 'Subscription']
}
