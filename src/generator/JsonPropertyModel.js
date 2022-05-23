
export default class JsonPropertyModel {
  constructor(property, options) {
    Object.assign(this, property)

    this.propertyType = typeof (this.propertyValue)
    this.options = options
    this.json = JSON.parse(options.userJson)

    this._processReplacements()
  }

  _processReplacements() {
    let nameReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'name')

    if (nameReplacementOptions) {
      let nameReplacementEntries = nameReplacementOptions.values
      let nameResult = null

      nameReplacementEntries.forEach(r => {
        nameResult = r.replace(this.propertyName, r.passJson ? this.options.userJson : null)
      })

      this.formattedPropertyName = nameResult ?? this.propertyName
    }

    let typeReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'type')

    if (typeReplacementOptions) {
      let typeReplacementEntries = typeReplacementOptions.values
      let typeResult = null

      typeReplacementEntries.forEach(r => {
        typeResult = r.replace(this.targetType, r.passJson ? this.options.userJson : null)
      })

      this.targetType = typeResult ?? this.targetType
    }
  }
}