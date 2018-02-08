<template>
  <md-card class="md-layout-item md-size-50 md-small-size-100">
    <md-card-header>
      <div class="md-title">{{displayName}} Profile</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-alignment-top-right">
          <md-button v-if="editMode" class="md-raised" @click="doCancelUser()">Cancel</md-button>
          <md-button v-if="editMode" class="md-raised md-primary" @click="doSaveUser()">Save</md-button>
          <md-button v-if="!editMode" class="md-raised md-primary" @click="doEditUser()">Edit</md-button>
        </div>
        <div class="md-layout-item md-size-100" v-for="(item, key) in userFields" :key="key">
        <component
          :is="item.type"
          v-bind="item.props"
          v-model="item.field"
        >
        </component>
        </div>
        <button v-on:click="log()">XXX</button>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import Vue from 'vue'
import TextCompo from '@/components/TextCompo'
import RadioCompo from '@/components/RadioCompo'
import DateCompo from '@/components/DateCompo'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(TextCompo)
Vue.use(RadioCompo)

export default {
  name: 'HelloWorld',
  components: {
    TextCompo,
    RadioCompo,
    DateCompo
  },
  data () {
    return {
      editMode: false,
      userFields: [
        {
          type: 'text-compo',
          props: {
            controlName: 'username',
            label: 'Username',
            mandatory: true,
            readonly: true
          },
          field: ''
        },
        {
          type: 'text-compo',
          props: {
            controlName: 'password',
            label: 'Password',
            mandatory: true,
            placeholder: 'Must contain one letter, one number, and one symbol',
            readonly: true,
            inputType: 'password'
          },
          field: ''
        },
        {
          type: 'text-compo',
          props: {
            controlName: 'firstname',
            label: 'First Name',
            mandatory: true,
            readonly: true
          },
          field: 'Coco'
        },
        {
          type: 'text-compo',
          props: {
            controlName: 'lastname',
            label: 'Last Name',
            mandatory: true,
            readonly: true
          },
          field: 'The Mutt'
        },
        {
          type: 'radio-compo',
          props: {
            controlName: 'gender',
            label: 'Gender',
            mandatory: true,
            radioOptions: 'Male\nFemale',
            readonly: true
          },
          field: 'Female'
        },
        {
          type: 'date-compo',
          props: {
            controlName: 'birthday',
            label: 'Birthday',
            mandatory: false,
            readonly: true
          },
          field: '2018-02-22'
        }
      ],
      storedValues: {}
    }
  },
  methods: {
    log: function () {
      console.log(this)
    },
    toggleEditMode: function () {
      this.editMode = !this.editMode
      this.userFields.forEach(item => {
        item.props.readonly = !this.editMode
      })
    },
    doEditUser: function () {
      // save current values
      this.storedValues = this.userFields.map(
        item => { return { fieldname: item.props.controlName, value: item.field } })
      this.toggleEditMode()
    },
    doCancelUser: function () {
      // revert values
      console.log(this.storedValues, this.userFields)
      this.storedValues.forEach(item => {
        this.getField(item.fieldname).field = item.value
      })
      this.toggleEditMode()
    },
    doSaveUser: function () {
      this.toggleEditMode()
    },
    getField: function (fieldname) {
      var field
      this.userFields.forEach(item => {
        if (item.props.controlName === fieldname) {
          field = item
        }
      })
      return field
    },
    getValue: function (fieldname) {
      var item = this.getField(fieldname)
      if (item) {
        return item.field
      }
    }
  },
  computed: {
    displayName: {
      get () {
        var firstname = this.getValue('firstname')
        var lastname = this.getValue('lastname')
        if (!firstname && !lastname) {
          return 'User'
        }
        return firstname + ' ' + lastname + '\'s'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
