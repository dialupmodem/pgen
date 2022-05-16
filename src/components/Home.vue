<template>
  <div>
    <TabView :activeIndex="active" @tab-change="tabChange">
      <TabPanel header="Options"></TabPanel>
      <TabPanel header="JSON">
        <Textarea v-model="userJson" @change="userJsonChange" rows="35" cols="200"></Textarea>
      </TabPanel>
      <TabPanel header="Code">
        <Textarea v-model="generatedCode" rows="35" cols="200"></Textarea>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import generatorOptions from '@/generator/generatorOptions'
import PocoModel from '@/generator/PocoModel'

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      userJson: '{ "test" : 1 }',
      generatedCode: '',
      options: generatorOptions,
      pocoModel: null
    }
  },
  methods: {
    generateClass() {
      this.pocoModel = new PocoModel('test', this.userJson, this.options)
      this.generatedCode = this.options.templateFunctions.class(this.pocoModel)
    },
    userJsonChange() {
      this.generateClass()
    },
    tabChange() {
      this.generateClass()
    }
  }
}

</script>