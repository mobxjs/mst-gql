module.exports = {
  format: 'ts',
  input: 'http://localhost:4000/graphql',
  outDir: 'src/models',
  roots: ['Todo'],
  excludes: ['CacheControlScope', 'Query', 'Subscription']
}
