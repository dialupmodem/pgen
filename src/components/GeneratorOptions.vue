<template>
  <Card>
    <template #header>
      <h5>Options</h5>
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
        <div class="field col-12 grid">
          <div class="col-2" style="width: 125px; padding-top: 0.25rem;">
            Use Base Class
          </div>
          <div class="col-1">
            <InputSwitch v-model="useBaseClass" @change="optionsChange"></InputSwitch>
          </div>
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
      className: options.className,
      baseClassName: options.baseClassName,
      useBaseClass: options.useBaseClass
    }
  },
  methods: {
    optionsChange() {
      options.className = this.className
      options.baseClassName = this.baseClassName
      options.useBaseClass = this.useBaseClass

      this.$emit('optionsChange', this.options)
    }
  }
}
</script>