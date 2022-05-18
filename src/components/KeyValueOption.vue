<template>
  <div class="col-12 grid">
    <h4>{{ header }}</h4>
    <div class="field col-12 mb-5">
      {{ description }}
    </div>
    <div class="field col-12 grid">
      <div class="col-fixed" style="width: 225px;">
        <label for="optionKey">{{ keyLabel }}</label>
        <InputText id="optionKey" v-model="userInput.key"></InputText>
      </div>
      <div class="col-fixed" style="width: 225px;">
        <label for="optionValue">{{ valueLabel }}</label>
        <InputText id="valueKey" v-model="userInput.value"></InputText>
      </div>
      <div class="col-fixed" style="align-self: end;">
        <Button label="Add" style="width: 80px;" @click="addOption"></Button>
      </div>
      <div class="col-1" style="align-self: end; justify-self: end;">
        <Button label="Clear All" @click="clearOptions"></Button>
      </div>
    </div>
    <div class="col-12 grid">
      <div class="field col-6">
        <DataTable :value="optionsCollection" responsive-layout="scroll">
          <Column field="key" :header="keyLabel"></Column>
          <Column field="value" :header="valueLabel"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KeyValueOption',
  props: {
    header: String,
    description: String,
    keyLabel: String,
    valueLabel: String,
    optionsCollection: Array
  },
  data() {
    return {
      userInput: {
        key: null,
        value: null
      },
    }
  },
  methods: {
    addOption() {
      this.$emit('addOption', { key: this.userInput.key, value: this.userInput.value })
      
      this.userInput.key = null
      this.userInput.value = null
    },
    clearOptions() {
      this.$emit('clearOptions')
    }
  }
}
</script>