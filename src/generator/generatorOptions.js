import replacements from './replacements'

const options = {
  className: 'UnknownModel',
  classNameTemplate: '$1Model',
  defaultType: 'object',
  baseClass: 'ModelBase',
  useBaseClass: true,
  complexNamePattern: '$1Model',
  replacements: replacements,
  replacementMode: null,
  userJson: "{ \"test\" : 1 }",
  templateFunctions: {
    className: (pocoModel) => {
      let className = pocoModel.formattedName
      if (pocoModel.options.useBaseClass) {
        className = `${className} : ${pocoModel.options.baseClassName}`
      }
      return className
    },
    class: (pocoModel) => {
      let properties = pocoModel.jsonProperties
      let propertyTemplateFunction = pocoModel.options.templateFunctions.property
      let className = pocoModel.options.templateFunctions.className(pocoModel)

      //let propertyTemplate = `public ${pocoModel.formattedName} ${pocoModel.options.useBaseClass ? `: ${pocoModel.options.baseClassName}` : ''} {\n`
      let propertyTemplate = `public ${className} {\n`
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