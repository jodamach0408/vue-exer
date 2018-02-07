<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25 label" v-bind:class="{ required : mandatory }">{{ label }}</div>
    <div class="md-layout-item md-size-75">
      <md-field>
        <md-input
          :placeholder="placeholder"
          :id="controlName"
          :value="value"
          @input="updateParent($event)"
          :required=mandatory
          :type="inputType"
          :readonly="readonly"
        >
        </md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import CompoMixin from './CompoMixin'

Vue.use(VueMaterial)

export default {
  name: 'TextCompo',
  mixins: [CompoMixin],
  data () {
    return {
    }
  },
  props: {
    inputType: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .label.required:after {
    content: '*';
    color: red;
  }
</style>
