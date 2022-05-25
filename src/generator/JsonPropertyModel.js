
export default class JsonPropertyModel {
  constructor(property, options) {
    Object.assign(this, property)

    this.propertyType = typeof (this.propertyValue)
    this.options = options
    this.targetType = options.userOptions.defaultComplexType

    this.json = JSON.parse(this.options.userJson)

    this._processReplacements()
  }

  _processReplacements() {
    let nameReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'name')

    if (nameReplacementOptions) {
      let nameResult = null

      nameReplacementOptions.forEach(r => {
        nameResult = r.replaceTarget(this.propertyName, this.passJson ? this.json : null)
      })

      this.formattedPropertyName = nameResult ?? this.propertyName
    }

    let typeReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'type')

    if (typeReplacementOptions) {
      let typeResult = this.propertyType

      typeReplacementOptions.forEach(r => {
        typeResult = r.replaceTarget(typeResult, this.passJson ? this.json : null)
      })

      if (typeResult) {
        this.targetType = typeResult
      }
    }
  }
}