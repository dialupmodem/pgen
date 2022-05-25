<template>
  <div>
    <div class="mb-5">
      <OptionsCard>
        <template #header>General</template>
        <div class="formgrid grid">
          <OptionInput
            v-for="userOption in localOptions.userOptions.generic"
            :key="userOption.key"
            :optionKey="userOption.key"
            :optionValue="userOption.value"
            :label="userOption.label"
            :inputType="userOption.inputType"
            @optionChange="updateOptions"
          >
          </OptionInput>
        </div>
      </OptionsCard>
    </div>
    <div
      class="mb-5"
      v-for="keyValueOption in localOptions.userOptions.keyValue"
      :key="keyValueOption.key"
    >
      <OptionsCard>
        <div class="formgrid grid">
          <KeyValueOption
            :keyValueOption="keyValueOption"
            @optionChange="updateKeyValueOptions"
          ></KeyValueOption>
        </div>
      </OptionsCard>
    </div>
  </div>
</template>

<style>
.field {
  text-align: left;
}

.pre,
code {
  white-space: pre-line;
}
</style>

<script>
import KeyValueOption from "./KeyValueOption.vue";
import OptionsCard from "./OptionsCard.vue";
import OptionInput from "./OptionInput.vue";

export default {
  name: "UserOptions",
  props: {
    options: Object,
  },
  components: { KeyValueOption, OptionsCard, OptionInput },
  data() {
    return {
      localOptions: null,
    };
  },
  methods: {
    updateOptions(eventOption) {
      let { name, value } = { ...eventOption };

      let userOption = this.localOptions.userOptions.generic.find(
        (o) => o.key == name
      );
      if (userOption) {
        userOption.value = value;
      }
    },
    updateKeyValueOptions(eventOption) {
      let { key, userInputKey, userInputValue } = { ...eventOption };
      let keyValueOption = this.localOptions.userOptions.keyValue.find(
        (o) => o.key == key
      );

      if (!keyValueOption) {
        return;
      }

      let newOption = { key: userInputKey, value: userInputValue };
      let option = keyValueOption.userValues.find((o) => o.key === userInputKey);

      if (!option) {
        keyValueOption.userValues.push(newOption);
      } else {
        let optionIndex = keyValueOption.userValues.indexOf(option);
        keyValueOption.userValues.splice(optionIndex, 1, newOption);
      }
    },
    optionsChange() {
      this.$emit("optionsChange", this.localOptions);
    },
  },
  beforeMount() {
    this.localOptions = this.options;
  },
};
</script>
