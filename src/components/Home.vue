<template>
  <div>
    <TabView :activeIndex="active" @tab-change="tabChange">
      <TabPanel header="Options">
        <UserOptions :options="options" @optionsChange="optionsChange"></UserOptions>
      </TabPanel>
      <TabPanel header="JSON">
        <Textarea v-model="options.userJson" @change="userJsonChange" rows="35" cols="200" style="width: 100%;"></Textarea>
      </TabPanel>
      <TabPanel header="Code">
        <Textarea v-model="generatedCode" rows="35" cols="200" style="width: 100%;"></Textarea>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import PocoModel from '@/generator/PocoModel'
import generatorOptions from '@/generator/generatorOptions';
import UserOptions from './UserOptions.vue'

export default {
  name: "Home",
  components: { UserOptions },
  data() {
    return {
      active: 0,
      generatedCode: "",
      options: null,
      pocoModel: null
    };
  },
  methods: {
    generateClass() {
      this.pocoModel = new PocoModel(this.options)
      this.generatedCode = this.classTemplate(this.pocoModel)
    },
    userJsonChange() {
      this.options.userJson = this.userJson
      this.generateClass()
    },
    tabChange() {
      this.generateClass()
    },
    optionsChange(updatedOptions) {
      this.options = updatedOptions
    },
  },
  beforeMount() {
    this.options = generatorOptions
    window.setTestData = () => {
      this.options.userJson = `{
        "GameContentLinks": [

        ],
        "GamePatch": {
          "Banner": "https://i.imgur.com/ZUUtGzH.png",
          "ExName": "A Realm Reborn",
          "ExVersion": 0,
          "ID": 2,
          "Name": "Patch 2.0: A Realm Reborn",
          "Name_cn": "Patch 2.0: A Realm Reborn",
          "Name_de": "Patch 2.0: A Realm Reborn",
          "Name_en": "Patch 2.0: A Realm Reborn",
          "Name_fr": "Patch 2.0: A Realm Reborn",
          "Name_ja": "新生エオルゼア 2.0",
          "Name_kr": "Patch 2.0: A Realm Reborn",
          "ReleaseDate": 1376611200,
          "Version": "2.0"
        },
        "ID": 1179648,
        "Patch": 2,
        "PlaceName": "Reginald Eventman I",
        "PlaceName_de": "Reginald Eventman I",
        "PlaceName_en": "Reginald Eventman I",
        "PlaceName_fr": "Reginald Eventman I",
        "PlaceName_ja": "イベント君１行き",
        "TargetLocations0": {
          "Fare": 0,
          "ID": 1,
          "Location": {
            "ID": 1179649,
            "PlaceName": "Reginald Eventman II",
            "PlaceName_de": "Reginald Eventman II",
            "PlaceName_en": "Reginald Eventman II",
            "PlaceName_fr": "Reginald Eventman II",
            "PlaceName_ja": "イベント君２行き",
            "TargetLocations0": null,
            "TargetLocations0Target": "ChocoboTaxi",
            "TargetLocations0TargetID": 0,
            "TargetLocations1": null,
            "TargetLocations1Target": "ChocoboTaxi",
            "TargetLocations1TargetID": 0,
            "TargetLocations2": null,
            "TargetLocations2Target": "ChocoboTaxi",
            "TargetLocations2TargetID": 0,
            "TargetLocations3": null,
            "TargetLocations3Target": "ChocoboTaxi",
            "TargetLocations3TargetID": 0,
            "TargetLocations4": null,
            "TargetLocations4Target": "ChocoboTaxi",
            "TargetLocations4TargetID": 0,
            "TargetLocations5": null,
            "TargetLocations5Target": "ChocoboTaxi",
            "TargetLocations5TargetID": 0,
            "TargetLocations6": null,
            "TargetLocations6Target": "ChocoboTaxi",
            "TargetLocations6TargetID": 0,
            "TargetLocations7": null,
            "TargetLocations7Target": "ChocoboTaxi",
            "TargetLocations7TargetID": 0
          },
          "LocationTarget": "ChocoboTaxiStand",
          "LocationTargetID": 1179649,
          "TimeRequired": 80
        },
        "TargetLocations0Target": "ChocoboTaxi",
        "TargetLocations0TargetID": 1,
        "TargetLocations1": null,
        "TargetLocations1Target": "ChocoboTaxi",
        "TargetLocations1TargetID": 0,
        "TargetLocations2": null,
        "TargetLocations2Target": "ChocoboTaxi",
        "TargetLocations2TargetID": 0,
        "TargetLocations3": null,
        "TargetLocations3Target": "ChocoboTaxi",
        "TargetLocations3TargetID": 0,
        "TargetLocations4": null,
        "TargetLocations4Target": "ChocoboTaxi",
        "TargetLocations4TargetID": 0,
        "TargetLocations5": null,
        "TargetLocations5Target": "ChocoboTaxi",
        "TargetLocations5TargetID": 0,
        "TargetLocations6": null,
        "TargetLocations6Target": "ChocoboTaxi",
        "TargetLocations6TargetID": 0,
        "TargetLocations7": null,
        "TargetLocations7Target": "ChocoboTaxi",
        "TargetLocations7TargetID": 0,
        "Url": "/ChocoboTaxiStand/1179648"
      }`
    }
    window.setTestData()
    this.options.userOptions.keyValue.find(k => k.key == 'dynamicReplacement').userValues.push({key: '(TargetLocations\\d+)', value: '$1Target'})
  },
  computed: {
    classTemplate() {
      return this.options.templates.class
    },
    userJson() {
      return this.options.userJson
    }
  }
}

</script>