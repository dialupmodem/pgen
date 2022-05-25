const genericReplacement = (target, replacementEntries) => {
  let result = target;

  replacementEntries.forEach(replacementEntry => {
    let pattern = new RegExp(replacementEntry.key)

    if (result?.match(pattern)) {
      result = result.replace(pattern, replacementEntry.value)
    }
  })

  return result
}

const dynamicReplacement = (json, target, replacementEntries) => {
  let result = target

  replacementEntries.forEach(replacementEntry => {
    let targetPattern = new RegExp(replacementEntry.key)
    let typePattern = new RegExp(replacementEntry.value)

    let targetMatch = target.match(targetPattern)
    if (targetMatch) {
      let typeSearch = target.replace(targetPattern, typePattern)
      let typeMatch = Object.keys(json)
        .find(k => k.match(typeSearch))

      if (typeMatch) {
        result = json[typeMatch]
      }
    }
  })

  return result
}

const userOptions = {
  getValue: function (key) {
    let option = this.generic.find(g => g.key == key)
    if (!option) {
      return null
    }

    return option.value
  },
  get className() {
    return this.getValue('className')
  },
  get complexPropertyTemplate() {
    return this.getValue('complexPropertyTemplate')
  },
  get baseClass() {
    return this.getValue('baseClass')
  },
  get useBaseClass() {
    return this.getValue('useBaseClass')
  },
  get defaultComplexType() {
    return this.getValue('defaultComplexType')
  },
  generic: [
    {
      key: 'className',
      value: 'UnknownModel',
      label: 'Class Name',
      inputType: 'text'
    },
    {
      key: 'complexPropertyTemplate',
      value: '$1Model',
      label: 'Complex Property Template',
      inputType: 'text'
    },
    {
      key: 'baseClass',
      value: 'ModelBase',
      label: 'Base Class Name',
      inputType: 'text'
    },
    {
      key: 'useBaseClass',
      value: true,
      label: 'Use Base Class',
      inputType: 'switch'
    },
    {
      key: 'defaultComplexType',
      value: 'object',
      label: 'Default Complex Type',
      inputType: 'text'
    }
  ],
  keyValue: [
    {
      key: 'nameReplacement',
      header: 'Name Replacement',
      description: 'Replace property names',
      optionKeyLabel: 'Pattern',
      optionValueLabel: 'Replacement',
      userValues: [
        { key: '_de', value: 'De' },
        { key: '_en', value: 'En' },
        { key: '_fr', value: 'Fr' },
        { key: '_ja', value: 'Ja' }
      ],
      replaceTarget: function (target) {
        return genericReplacement(target, this.userValues)
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
      userValues: [
        { key: 'number', value: 'int' },
        { key: 'string', value: 'string' }
      ],
      replaceTarget: function (target) {
        return genericReplacement(target, this.userValues)
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
      userValues: [],
      replaceTarget: function (target) {
        return genericReplacement(target, this.userValues)
      },
      target: 'type',
      passJson: false
    },
    {
      key: 'dynamicReplacement',
      header: 'Dynamic Replacement',
      description: 'Replace objects with dynamic types stored in property userValues',
      optionKeyLabel: 'Target Property Pattern',
      optionValueLabel: 'Type Value Property Pattern',
      userValues: [],
      replaceTarget: function (target, json) {
        return dynamicReplacement(json, target, this.userValues)
      },
      target: 'type',
      passJson: true
    }
  ]
}

export default userOptions