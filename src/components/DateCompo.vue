<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-25 label" v-bind:class="{ required : mandatory }">{{ label }}</div>
    <div class="md-layout-item md-size-75">
      <md-datepicker ref="picker"
        :placeholder="placeholder"
        :id="controlName"
        :value="value"
        @input="transformAndUpdateParent($event)"
        :required=mandatory
        :readonly="readonly"
      >
      </md-datepicker>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import CompoMixin from './CompoMixin'
import format from 'date-fns/format'

Vue.use(VueMaterial)

export default {
  name: 'DateCompo',
  mixins: [CompoMixin],
  data () {
    return {
    }
  },
  methods: {
    transformAndUpdateParent (val) {
      console.log(val)
      this.updateParent(this.dateToHTMLString(val))
    },
    dateToHTMLString (date) {
      if (date) {
        let formattedDate = null
        try {
          formattedDate = format(date, 'YYYY-MM-DD')
        } catch (error) {
          Vue.util.warn(`The datepicker value is not a valid date. Given value: ${date}.`, this)
        }
        return formattedDate
      }
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
