<template>
  <Card>
    <template #content>
      <h4>
        <slot name="header"></slot>
      </h4>
      <slot></slot>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'OptionsCard',
  data() {
    return {
      
    }
  }
}
</script>