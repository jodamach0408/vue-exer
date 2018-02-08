<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25 label" v-bind:class="{ required : mandatory }">{{ $t(label) }}</div>
    <div class="md-layout-item md-size-75">
      <md-field>
        <md-textarea
          :placeholder="placeholder"
          :id="controlName"
          :value="value"
          @input="updateParent($event)"
          :required=mandatory
          :readonly="readonly"
        >
        </md-textarea>
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
  name: 'TextareaCompo',
  mixins: [CompoMixin],
  data () {
    return {
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
