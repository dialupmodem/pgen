<template>
  <div class="field col-12" v-if="isTextInput">
    <label for="optionName">{{ localOption.label }}</label>
    <InputText
      id="optionName"
      v-model="localOption.value"
      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
      @change="optionChange"
    >
    </InputText>
    <span style="font-style: italic; font-size: 0.85rem">{{
      sampleValue
    }}</span>
  </div>
  <div class="field col-12 grid mb-5" v-if="isSwitchInput">
    <div class="col-2" style="width: 125px; padding-top: 0.25rem">
      {{ localOption.label }}
    </div>
    <div class="col-1">
      <InputSwitch
        v-model="localOption.value"
        @change="optionChange"
      ></InputSwitch>
    </div>
  </div>
  <div class="field col-12" v-if="isDropdownInput">
    <div class="field col-4 pl-0">
      <label for="optionName">{{ localOption.label }}</label>
      <Dropdown
        id="optionName"
        class="w-full"
        v-model="localOption.value"
        :options="localOption.selection"
        option-label="label"
        option-value="value"
      ></Dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "OptionInput",
  props: {
    userOption: Object,
  },
  data() {
    return {
      localOption: null,
    };
  },
  emits: ["optionChange"],
  methods: {
    optionChange() {
      this.$emit("optionChange", {
        name: this.optionKey,
        value: this.localOption.value,
      });
    },
  },
  computed: {
    isTextInput() {
      return this.localOption.inputType == "text";
    },
    isSwitchInput() {
      return this.localOption.inputType == "switch";
    },
    isDropdownInput() {
      return this.localOption.inputType == "dropdown";
    },
    selection() {
      return this.localOption.selection ?? null;
    },
    sampleValue() {
      if (typeof this.localOption.sampleValue == "function") {
        return this.localOption.sampleValue();
      }
      return null;
    },
    value() {
      if (typeof this.localOption.value == "function") {
        return this.localOption.value();
      }

      return this.localOption.value;
    },
  },
  beforeMount() {
    this.localOption = this.userOption;
  },
};
</script>
