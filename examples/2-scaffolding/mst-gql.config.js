module.exports = {
  force: true,
  format: 'ts',
  input: 'graphql-schema.json',
  outDir: 'src/models',
  roots: ['Pokemon', 'Attack'],
}