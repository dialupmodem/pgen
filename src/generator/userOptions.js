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

const dynamicReplacement = (target, jsonProperty, replacementEntries) => {
  let result = target

  replacementEntries.forEach(replacementEntry => {
    let targetPattern = new RegExp(replacementEntry.key)
    let typePattern = replacementEntry.value

    let match = jsonProperty.formattedPropertyName.match(targetPattern)
    if (match) {
      let typePropertyName = jsonProperty.formattedPropertyName.replace(targetPattern, typePattern)
      let typePropertyValue = jsonProperty.json[`${typePropertyName}`]

      if (typePropertyValue) {
        result = typePropertyValue
      }
    }
  })

  return result
}

const genericReplaceSample = (value, exampleName) => {
  if (!exampleName) {
    exampleName = 'ExamplePropertyName'
  }
  let regex = new RegExp(`(${exampleName})`)
  let sample = exampleName.replace(regex, value)

  return `${exampleName} -> ${sample}`
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
  get attributeMode() {
    return this.getValue('attributeMode')
  },
  get attributeTemplate() {
    return this.getValue('attributeTemplate')
  },
  get useNullableTypes() {
    return this.getValue('useNullableTypes')
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
      inputType: 'text',
      sampleValue: function () {
        return genericReplaceSample(this.value)
      }
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
      key: 'useNullableTypes',
      value: true,
      label: 'Use Nullable Types',
      inputType: 'switch'
    },
    {
      key: 'defaultComplexType',
      value: 'object',
      label: 'Default Complex Type',
      inputType: 'text'
    },
    {
      key: 'attributeTemplate',
      value: '[Column("$1")]',
      label: 'Attribute Template',
      inputType: 'text',
      sampleValue: function () {
        return genericReplaceSample(this.value)
      }
    },
    {
      key: 'attributeMode',
      label: 'Attribute Mode',
      inputType: 'dropdown',
      selection: [
        { label: 'All Properties', value: 'all' },
        { label: 'Only Renamed Properties', value: 'onlyRenamed' },
        { label: 'None', value: 'none' }
      ],
      value: 'onlyRenamed'
    }
  ],
  keyValue: [
    {
      key: 'nameReplacement',
      header: 'Name Replacement',
      description: 'Replace property names, an empty replacement will remove the property completely',
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
      isComplex: false
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
      isComplex: false
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
      isComplex: false
    },
    {
      key: 'dynamicReplacement',
      header: 'Dynamic Replacement',
      description: 'Replace objects with dynamic types stored in property userValues',
      optionKeyLabel: 'Target Property Pattern',
      optionValueLabel: 'Type Value Property Pattern',
      userValues: [],
      replaceTarget: function (target, jsonProperty) {
        return dynamicReplacement(target, jsonProperty, this.userValues)
      },
      target: 'type',
      isComplex: true
    }
  ],

}

export default userOptions