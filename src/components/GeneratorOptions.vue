<template>
  <Card>
    <template #header>
      <h3>Options</h3>
    </template>
    <template #content>
      <div class="formgrid grid">
        <div class="field col-12">
          <label for="className">Class Name</label>
          <InputText id="className" v-model="localOptions.className"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            @change="optionsChange">
          </InputText>
        </div>
        <div class="field col-12">
          <label for="baseClassName">Base Class Name</label>
          <InputText id="baseClassName"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            @change="optionsChange" v-model="localOptions.baseClassName"></InputText>
        </div>
        <div class="field col-12 grid mb-5">
          <div class="col-2" style="width: 125px; padding-top: 0.25rem;">
            Use Base Class
          </div>
          <div class="col-1">
            <InputSwitch v-model="localOptions.useBaseClass" @change="optionsChange"></InputSwitch>
          </div>
        </div>
        <KeyValueOption header="Type Replacmenent" description="Replace JSON types with target types" keyLabel="Pattern"
          valueLabel="Replacement" :optionsCollection="typeReplacements" @addOption="addTypeReplacement"
          @clearOptions="clearTypeReplacements">
        </KeyValueOption>
        <KeyValueOption header="Object Mapping"
          description="Replace object types with complex types based on patterns below. An empty string will remove matching properties completely." keyLabel="Pattern"
          valueLabel="Replacement" :optionsCollection="objectReplacements" @addOption="addObjectMapping"
          @clearOptions="clearObjectMappings">
        </KeyValueOption>
        <KeyValueOption header="Dynamic Mapping"
          description="Replace object types when target type is the value of another property"
          keyLabel="Target Property Pattern" valueLabel="Type Property Pattern"
          :optionsCollection="dynamicReplacements" @addOption="addDynamicMapping"
          @clearOptions="clearDynamicMappings">
        </KeyValueOption>

      </div>

    </template>
  </Card>
</template>

<style>
.field {
  text-align: left;
}

.pre,
code {
  white-space: pre-line
}
</style>

<script>
import KeyValueOption from "./KeyValueOption.vue"

export default {
  name: "GeneratorOptions",
  props: {
    options: Object
  },
  components: { KeyValueOption },
  data() {
    return {
      localOptions: {
        className: null,
        baseClassName: null,
        useBaseClass: null,
        replacements: {
          type: [],
          objects: [],
          dynamic: []
        }
      }
    }
  },
  methods: {
    addTypeReplacement(eventOption) {
      this.addOption(this.typeReplacements, eventOption)
    },
    addObjectMapping(eventOption) {
      this.addOption(this.objectReplacements, eventOption)
    },
    addDynamicMapping(eventOption) {
      this.addOption(this.dynamicReplacements, eventOption)
    },
    clearTypeReplacements() {
      this.typeReplacements = []
    },
    clearObjectMappings() {
      this.objectReplacements = []
    },
    clearDynamicMappings() {
      this.dynamicReplacements = []
    },
    addOption(optionsCollection, eventOption) {
      if (!optionsCollection) {
        return
      }
      let option = { ...eventOption }
      let optionIndex = optionsCollection.findIndex(o => o.key == eventOption.key)
      let hasOption = optionIndex >= 0

      if (!hasOption) {
        optionsCollection.push(option)
      }
      else {
        optionsCollection.splice(optionIndex, 1, option)
      }
    },
    optionsChange() {
      this.$emit("optionsChange", this.localOptions);
    }
  },
  mounted() {
    Object.assign(this.localOptions, this.options)
  },
  computed: {
    typeReplacements: {
      get() {
        return this.localOptions.replacements.type
      },
      set(newValue) {
        this.localOptions.replacements.type = newValue
      }
    },
    objectReplacements: {
      get() {
        return this.localOptions.replacements.objects
      },
      set(newValue) {
        this.localOptions.replacements.objects = newValue
      },
    },
    dynamicReplacements: {
      get() {
        return this.localOptions.replacements.dynamic
      },
      set(newValue) {
        this.localOptions.replacements.dynamic = newValue
      }
    }
  }
}
</script>