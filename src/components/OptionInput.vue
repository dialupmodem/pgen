<template>
  <div class="field col-12" v-if="isTextInput">
    <label for="optionName">{{ label }}</label>
    <InputText
      id="optionName"
      v-model="localOptionValue"
      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
      @change="optionChange"
    >
    </InputText>
  </div>
  <div class="field col-12 grid mb-5" v-if="isSwitchInput">
    <div class="col-2" style="width: 125px; padding-top: 0.25rem">
      {{ label }}
    </div>
    <div class="col-1">
      <InputSwitch
        v-model="localOptionValue"
        @change="optionChange"
      ></InputSwitch>
    </div>
  </div>
</template>
<script>
export default {
  name: "OptionInput",
  props: {
    label: String,
    inputType: String,
    optionKey: String,
    optionValue: [String, Boolean],
  },
  data() {
    return {
      localOptionValue: null
    };
  },
  emits: ["optionChange"],
  methods: {
    optionChange() {
      this.$emit("optionChange", {
        name: this.optionKey,
        value: this.localOptionValue
      });
    },
  },
  computed: {
    isTextInput() {
      return this.inputType == "text";
    },
    isSwitchInput() {
      return this.inputType == "switch";
    },
  },
  mounted() {
    this.localOptionValue = this.optionValue
  }
};
</script>
