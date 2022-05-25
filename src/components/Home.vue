<template>
  <div>
    <TabView :activeIndex="active" @tab-change="tabChange">
      <TabPanel header="Options">
        <UserOptions
          :options="options"
          @optionsChange="optionsChange"
        ></UserOptions>
      </TabPanel>
      <TabPanel header="JSON">
        <div class="grid">
          <div class="col-12 grid">
            <div class="col-5">
              <InputText v-model="jsonUrl" style="width: 100%"></InputText>
            </div>
            <div class="col-1">
              <Button label="Fetch JSON" @click="fetchJson"></Button>
            </div>
          </div>
          <div class="col-6 text-left" v-if="fetchError != null">
            <span style="color: red">{{ fetchError }}</span>
          </div>
          <div class="col-12">
            <Textarea
              v-model="rawJson"
              rows="35"
              cols="200"
              style="width: 100%"
              @change="rawJsonChange"
            ></Textarea>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Code">
        <Textarea
          v-model="generatedCode"
          rows="35"
          cols="200"
          style="width: 100%"
        ></Textarea>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import PocoModel from "@/generator/PocoModel";
import generatorOptions from "@/generator/generatorOptions";
import UserOptions from "./UserOptions.vue";

export default {
  name: "Home",
  components: { UserOptions },
  data() {
    return {
      active: 0,
      generatedCode: "",
      jsonUrl: null,
      fetchError: "",
      rawJson: null,
      options: null,
      pocoModel: null,
    };
  },
  methods: {
    generateClass() {
      this.pocoModel = new PocoModel(this.options);
      this.generatedCode = this.classTemplate(this.pocoModel);
    },
    rawJsonChange() {
      this.options.userJson = JSON.parse(this.rawJson);
      this.rawJson = JSON.stringify(this.options.userJson, null, 2);
      this.generateClass();
    },
    tabChange() {
      this.generateClass();
    },
    optionsChange(updatedOptions) {
      this.options = updatedOptions;
    },
    fetchJson() {
      this.fetchError = "";
      fetch(this.jsonUrl)
        .catch((err) => {
          this.fetchError = err;
        })
        .then((response) => {
          return response?.json() ?? null;
        })
        .catch((err) => {
          this.fetchError = `Unable to read JSON: ${err} ${this.fetchError}`;
        })
        .then((json) => {
          if (json != null) {
            this.options.userJson = json;
            this.rawJson = JSON.stringify(json, null, 2);
          }
        });
    },
  },
  beforeMount() {
    this.options = generatorOptions;
  },
  computed: {
    classTemplate() {
      return this.options.templates.class;
    },
    userJson() {
      return this.options.userJson;
    },
  },
};
</script>
