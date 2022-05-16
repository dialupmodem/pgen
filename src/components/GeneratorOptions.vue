<template>
  <Card>
    <template #header>
      <h3>Options</h3>
    </template>
    <template #content>
      <div class="formgrid grid">
        <div class="field col-12">
          <label for="className">Class Name</label>
          <InputText id="className" v-model="className"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            @change="optionsChange">
          </InputText>
        </div>
        <div class="field col-12">
          <label for="baseClassName">Base Class Name</label>
          <InputText id="baseClassName"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            @change="optionsChange" v-model="baseClassName"></InputText>
        </div>
        <div class="field col-12 grid mb-5">
          <div class="col-2" style="width: 125px; padding-top: 0.25rem;">
            Use Base Class
          </div>
          <div class="col-1">
            <InputSwitch v-model="useBaseClass" @change="optionsChange"></InputSwitch>
          </div>
        </div>
        <h4>Object Mapping</h4>
        <div class="field col-12 mb-5">
          Used to configure what complex types should map to instead of a generic object. Items added to the list below
          will be included or excluded depending on the mode selected.
        </div>
        
        <div class="field col-12 grid">
          <div class="col-fixed" style="width: 225px;">
            <label for="addPattern">Pattern</label>
            <InputText id="addPattern" v-model="addPattern"></InputText>
          </div>
          <div class="col-fixed" style="width: 225px;">
            <label for="addReplacement">Replacement</label>
            <InputText id="addReplacement" v-model="addReplacement"></InputText>
          </div>
          <div class="col-fixed" style="align-self: end;">
            <Button label="Add" style="width: 80px;" @click="addTypeMapping"></Button>
          </div>
          <div class="col-1" style="align-self: end; justify-self: end;">
            <Button label="Clear All" @click="clearMapping"></Button>
          </div>
        </div>
        <div class="field col-6">
          <DataTable :value="objectReplacements" responsiveLayout="scroll">
            <column field="pattern" header="Pattern"></column>
            <Column field="replacement" header="Replacement"></Column>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>

<style>
.field {
  text-align: left;
}
</style>

<script>
import options from "../generator/generatorOptions"

export default {
  name: 'GeneratorOptions',
  props: {
    options: Object
  },
  data() {
    return {
      className: this.options.className,
      baseClassName: this.options.baseClassName,
      useBaseClass: this.options.useBaseClass,
      objectReplacements: this.options.replacements.objects,
      replacementMode: this.options.replacementMode,
      addPattern: null,
      addReplacement: null,
      replacementOptions: [
        'Allow',
        'Deny'
      ]
    }
  },
  methods: {
    addTypeMapping() {
      if (!this.addPattern) {
        return
      }

      let typeMapping = this.objectReplacements
        .find(r => r.pattern == this.addPattern)

      if (!typeMapping) {
        typeMapping = {}
      }

      typeMapping.pattern = this.addPattern
      typeMapping.replacement = this.addReplacement

      let typeMappingIndex = this.objectReplacements.findIndex(r => r.pattern == typeMapping.pattern)
      if (!(typeMappingIndex >= 0)) {
        console.log('test')
        this.objectReplacements.push(typeMapping)
      }
      else {
        this.objectReplacements = this.objectReplacements.splice(typeMappingIndex, 1, typeMapping)
      }

      this.addPattern = null
      this.addReplacement = null
    },
    clearMapping() {
      this.objectReplacements = []
    },
    optionsChange() {
      options.className = this.className
      options.baseClassName = this.baseClassName
      options.useBaseClass = this.useBaseClass

      this.$emit('optionsChange', this.options)
    }
  }
}
</script>