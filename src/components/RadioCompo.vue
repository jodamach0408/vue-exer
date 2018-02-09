<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25 label" v-bind:class="{ required : mandatory }">{{ $t(label) }}</div>
    <div class="md-layout-item md-size-75">
      <md-radio
        :key="key"
        v-for="(item, key) in parsedOptions"
        :model="value"
        :id="controlName"
        :value="item"
        @change="updateParent($event)"
        :required=mandatory
        :disabled="readonly"
      >{{ item }}
      </md-radio>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import CompoMixin from './CompoMixin'

Vue.use(VueMaterial)

export default {
  name: 'RadioCompo',
  data () {
    return {
    }
  },
  mixins: [CompoMixin],
  computed: {
    parsedOptions: {
      get () {
        return this.radioOptions.split('\n')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-radio.md-required label:after {
    content: '';
  }
  .label.required:after {
    content: '*';
    color: red;
  }
  .md-radio {
    display: flex;
  }
</style>
