import replacements from './replacements'

export default class JsonPropertyModel {
  constructor(property, options) {
    Object.assign(this, property)

    this.propertyType = typeof (this.propertyValue)
    this.options = options
    this.json = JSON.parse(options.userJson)

    this._setFormattedName()
    this._setTargetType()
  }
  _setFormattedName() {
    this.formattedPropertyName = this._processReplacements(replacements.name, this.propertyName)
    if (!this.formattedPropertyName) {
      this.formattedPropertyName = this.propertyName
    }
  }
  _createReplacementOption(replacementEntry) {
    return {
      pattern: new RegExp(replacementEntry.key),
      replacement: replacementEntry.value
    }
  }
  _processReplacements(replacementCollection, target) {
    let result = null

    replacementCollection.forEach(replacementEntry => {
      let { pattern, replacement } = {
        ...this._createReplacementOption(replacementEntry)
      }

      if (target.match(pattern)) {
        result = target.replace(pattern, replacement)
      }
    })

    return result
  }
  _processDynamicReplacements(replacementCollection, target) {
    let result = null

    replacementCollection.forEach(replacementEntry => {
      let { pattern, replacement } = {
        ...this._createReplacementOption(replacementEntry)
      }

      let targetPattern = pattern
      let typePattern = replacement

      let targetMatch = target.match(targetPattern)
      if (targetMatch) {
        let typeSearch = target.replace(targetPattern, typePattern)
      
        let typeMatch = Object.keys(this.json)
          .find(k => {
            console.log(`k: ${k} typeSearch: ${typeSearch} isMatch: ${k.match(typeSearch)}`)
            return k.match(typeSearch)
          })

        if (typeMatch) {
          result = this.json[typeMatch]
        }
      }
    })

    return result
  }
  _setTargetType() {
    this.targetType = this._processReplacements(replacements.type, this.propertyType)
    if (!this.targetType) {
      this.targetType = this.options.defaultType
    }

    if (this.targetType == 'object') {
      let dynamicReplacement = this._processDynamicReplacements(replacements.dynamic, this.propertyName)
      if (dynamicReplacement) {
        this.targetType = dynamicReplacement
      }

      let objectReplacement = this._processReplacements(replacements.objects, this.propertyName)
      if (objectReplacement) {
        [
          this.targetType = objectReplacement
        ]
      }
    }
  }
}