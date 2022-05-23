export default class GeneratorOptions {
  constructor() {
    this.userJson = ''
    this.userOptions = {
      generic: [
        { key: 'className', value: 'UnknownModel', label: 'Class Name', inputType: 'text' },
        { key: 'complexPropertyTemplate', value: '$1Model', label: 'Complex Property Template', inputType: 'text' },
        { key: 'baseClass', value: 'ModelBase', label: 'Base Class Name', inputType: 'text' },
        { key: 'useBaseClass', value: true, label: 'Use Base Class', inputType: 'switch' }
      ],
      keyValue: [
        {
          key: 'typeReplacement',
          header: 'Type Replacement',
          description: 'Replace JSON types with target types',
          optionKeyLabel: 'Pattern',
          optionValueLabel: 'Replacement',
          values: [
            { key: 'number', value: 'int' }
          ]
        },
      ]
    }
  }
}