const options = {
  defaultClassName: 'UnknownModel',
  defaultType: 'object',
  baseClass: 'ModelBase',
  useBaseClass: true,
  templateFunctions: {
    class: (pocoModel) => {
      let properties = pocoModel.jsonProperties
      let propertyTemplateFunction = pocoModel.options.templateFunctions.property

      let propertyTemplate = `public ${pocoModel.formattedName} ${pocoModel.options.useBaseClass ? `: ${pocoModel.options.baseClass}` : ''} {\n`
      propertyTemplate += `${properties?.map(p => { return `  ${propertyTemplateFunction(p)}\n` }).join('')}`
      propertyTemplate += '}'

      return propertyTemplate
    },
    property: (jsonPropertyModel) => {
      return `  public ${jsonPropertyModel.targetType}? ${jsonPropertyModel.formattedPropertyName} { get; set; }`
    }
  }
}

export default options