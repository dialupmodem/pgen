const replacements = {
  name: [
    { pattern: /_de/, replacement: 'De' },
    { pattern: /_en/, replacement: 'En' },
    { pattern: /_fr/, replacement: 'Fr' },
    { pattern: /_ja/, replacement: 'Ja' }
  ],
  type: [
    { pattern: /number/, replacement: 'int' },
    { pattern: /string/, replacement: 'string' }
  ],
  objects: []
}

export default replacements