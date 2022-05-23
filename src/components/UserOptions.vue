<template>
  <div>
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
          {{ userOption }}
        </OptionInput>
        <KeyValueOption
          v-for="keyValueOption in localOptions.userOptions.keyValue"
          :key="keyValueOption.key"
          :keyValueOption="keyValueOption"
          @optionChange="updateKeyValueOptions"
        >
        </KeyValueOption>
        <KeyValueOption></KeyValueOption>
      </div>
    </OptionsCard>
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
    addTypeReplacement(eventOption) {
      this.addOption(this.typeReplacements, eventOption);
    },
    addObjectMapping(eventOption) {
      this.addOption(this.objectReplacements, eventOption);
    },
    addDynamicMapping(eventOption) {
      this.addOption(this.dynamicReplacements, eventOption);
    },
    clearTypeReplacements() {
      this.typeReplacements = [];
    },
    clearObjectMappings() {
      this.objectReplacements = [];
    },
    clearDynamicMappings() {
      this.dynamicReplacements = [];
    },
    changeClassName(className) {
      this.localOptions.className = className;
    },
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
      let option = keyValueOption.values.find((o) => o.key === userInputKey);

      if (!option) {
        keyValueOption.values.push(newOption);
      } else {
        let optionIndex = keyValueOption.values.indexOf(option);
        keyValueOption.values.splice(optionIndex, 1, newOption);
      }
    },
    optionsChange() {
      this.$emit("optionsChange", this.localOptions);
    },
    testOptionChange(data) {
      console.log(data);
    },
  },
  beforeMount() {
    this.localOptions = this.options;
  },
  computed: {
    typeReplacements: {
      get() {
        return this.localOptions.replacements.type;
      },
      set(newValue) {
        this.localOptions.replacements.type = newValue;
      },
    },
    objectReplacements: {
      get() {
        return this.localOptions.replacements.objects;
      },
      set(newValue) {
        this.localOptions.replacements.objects = newValue;
      },
    },
    dynamicReplacements: {
      get() {
        return this.localOptions.replacements.dynamic;
      },
      set(newValue) {
        this.localOptions.replacements.dynamic = newValue;
      },
    },
  },
};
</script>
