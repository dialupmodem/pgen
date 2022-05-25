<template>
  <div v-if="keyValueOption" class="col-12 grid">
    <h4>{{ header }}</h4>
    <div class="field col-12 mb-5">
      {{ description }}
    </div>
    <div class="field col-12 grid">
      <div class="col-fixed" style="width: 225px">
        <label for="optionKey">{{ optionKeyLabel }}</label>
        <InputText id="optionKey" v-model="userInput.key"></InputText>
      </div>
      <div class="col-fixed" style="width: 225px">
        <label for="optionValue">{{ optionValueLabel }}</label>
        <InputText id="valueKey" v-model="userInput.value"></InputText>
      </div>
      <div class="col-fixed" style="align-self: end">
        <Button label="Add" style="width: 80px" @click="optionChange"></Button>
      </div>
      <div class="col-1" style="align-self: end; justify-self: end">
        <Button label="Clear All" @click="clearOptions"></Button>
      </div>
    </div>
    <div class="col-12 grid">
      <div class="field col-6">
        <DataTable :value="userValues" responsive-layout="scroll">
          <Column field="key" :header="optionKeyLabel"></Column>
          <Column field="value" :header="optionValueLabel"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "KeyValueOption",
  props: {
    keyValueOption: Object,
  },
  emits: ["optionChange"],
  data() {
    return {
      userInput: {
        key: null,
        value: null,
      },
    };
  },
  methods: {
    optionChange() {
      this.$emit("optionChange", {
        key: this.key,
        userInputKey: this.userInput.key,
        userInputValue: this.userInput.value,
      });
    },
    clearOptions() {
      this.$emit("clearOptions");
    },
  },
  computed: {
    key() {
      return this.keyValueOption?.key
    },
    header() {
      return this.keyValueOption?.header
    },
    description() {
      return this.keyValueOption?.description
    },
    optionKeyLabel() {
      return this.keyValueOption?.optionKeyLabel
    },
    optionValueLabel() {
      return this.keyValueOption?.optionValueLabel
    },
    userValues() {
      return this.keyValueOption?.userValues
    }
  }
};
</script>
