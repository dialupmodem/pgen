<template>
  <div>
    {{ userJson }}
    <TabView :activeIndex="active">
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
      userJson: '',
      generatedCode: '',
      options: generatorOptions,
      pocoModel: null
    }
  },
  methods: {
    userJsonChange() {
      if (!this.pocoModel) {
        this.pocoModel = new PocoModel('test', this.userJson, this.options)
        this.generatedCode = this.options.templateFunctions.class(this.pocoModel)
      }
      console.log(this.pocoModel)
    }
  }
}

</script>