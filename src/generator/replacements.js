const replacements = {
  name: [
    { pattern: /_de/, replacement: 'De' },
    { pattern: /_ja/, replacement: 'Ja' }
  ],
  type: [
    {
      pattern: /number/, replacement: 'int',
    }
  ]
}

export default replacements