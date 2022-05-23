const genericReplacement = (target, replacementEntries) => {
  let result = null

  replacementEntries.forEach(replacementEntry => {
    let pattern = new RegExp(replacementEntry.key)

    if (target.match(pattern)) {
      result = target.replace(pattern, replacementEntry.value)
    }

    return result
  })
}

const dynamicReplacement = (json, target, replacementEntries) => {
  let result = null

  replacementEntries.forEach(replacementEntry => {
    let targetPattern = new RegExp(replacementEntry.key)
    let typePattern = new RegExp(replacementEntry.value)

    let targetMatch = target.match(targetPattern)
    if (targetMatch) {
      let typeSearch = target.replace(targetPattern, typePattern)
      let typeMatch = Object.keys(json)
      .find(k => k.match(typeSearch))

      if (typeMatch) {
        result = this.json[typeMatch]
      }
    }
  })

  return result
}

const userOptions = {
  generic: [
    { key: 'className', value: 'UnknownModel', label: 'Class Name', inputType: 'text' },
    { key: 'complexPropertyTemplate', value: '$1Model', label: 'Complex Property Template', inputType: 'text' },
    { key: 'baseClass', value: 'ModelBase', label: 'Base Class Name', inputType: 'text' },
    { key: 'useBaseClass', value: true, label: 'Use Base Class', inputType: 'switch' }
  ],
  keyValue: [
    {
      key: 'nameReplacement',
      header: 'Name Replacement',
      description: 'Replace property names',
      optionKeyLabel: 'Pattern',
      optionValueLabel: 'Replacement',
      values: [
        { key: '_de', value: 'De' },
        { key: '_en', value: 'En' },
        { key: '_fr', value: 'Fr' },
        { key: '_ja', value: 'Ja' }
      ],
      replace: function(target) {
        genericReplacement(target, this.values)
      },
      target: 'name',
      passJson: false
    },
    {
      key: 'typeReplacement',
      header: 'Type Replacement',
      description: 'Replace JSON types with target types',
      optionKeyLabel: 'Pattern',
      optionValueLabel: 'Replacement',
      values: [
        { key: 'number', value: 'int' },
        { key: 'string', value: 'string' }
      ],
      replace: function (target) {
        genericReplacement(target, this.values)
      },
      target: 'type',
      passJson: false
    },
    {
      key: 'objectReplacement',
      header: 'Object Replacement',
      description: 'Replace objects with complex types',
      optionKeyLabel: 'Pattern',
      optionValueLabel: 'Replacement',
      values: [],
      replace: function (target) {
        genericReplacement(target, this.values)
      },
      target: 'type',
      passJson: false
    },
    {
      key: 'dynamicReplacement',
      header: 'Dynamic Replacement',
      description: 'Replace objects with dynamic types stored in property values',
      optionKeyLabel: 'Target Property Pattern',
      optionValueLabel: 'Type Value Property Pattern',
      values: [],
      replace: function (target, json) {
        dynamicReplacement(json, target, this.values)
      },
      target: 'type',
      passJson: true
    }
  ]
}

export default userOptions