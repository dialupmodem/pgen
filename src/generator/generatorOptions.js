const options = {
  defaultClassName: 'UnknownModel',
  defaultType: 'object',
  baseClass: 'ModelBase',
  useBaseClass: true,
  templateFunctions: {
    class: (pocoModel) => {
      let properties = pocoModel.jsonProperties
      let propertyTemplateFunction = pocoModel.options.templateFunctions.property

      return `public ${pocoModel.formattedName} ${pocoModel.options.useBaseClass ? `: ${pocoModel.options.baseClass}` : ''} {\n
        ${properties?.map(p => { return propertyTemplateFunction(p) })}
      }\n`
    },
    property: (jsonPropertyModel) => {
      return `  public ${jsonPropertyModel.targetType}? ${jsonPropertyModel.formattedPropertyName} { get; set; }\n`
    }
  }
}

export default options