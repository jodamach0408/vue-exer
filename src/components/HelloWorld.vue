<template>
  <md-content>
    <div class="md-layout-item">
      <md-field>
        <label for="language">{{ $t('labels.language') }}</label>
        <md-select v-model="language" name="language" id="language" md-dense>
          <md-option value="en">English</md-option>
          <md-option value="pkm">Pikachu</md-option>
        </md-select>
      </md-field>
    </div>
    <md-card v-if="errors.length" class="md-layout md-size-50 md-small-size-100 md-accent">
      <md-card-content>
        <ul>
          <li class="error" :key="key" v-for="(error, key) in errors">
            {{ $t(error.msg, {field: error.label}) }}
          </li>
        </ul>
      </md-card-content>
    </md-card>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <md-toolbar>
          <h3 class="md-title">{{ $t('labels.userProfile', {displayName: displayName}) }}</h3>
          <div class="md-layout-item md-alignment-center-right">
            <md-button v-if="editMode" class="md-raised" @click="doCancel('storedValues', 'userFields', 'editMode', 'errors')">{{ $t('buttons.cancel') }}</md-button>
            <md-button v-if="editMode" class="md-raised md-primary" @click="doSave('userFields', 'editMode', 'errors')">{{ $t('buttons.save') }}</md-button>
            <md-button v-if="!editMode" class="md-raised md-primary" @click="doEdit('storedValues', 'userFields', 'editMode')">{{ $t('buttons.edit') }}</md-button>
          </div>
        </md-toolbar>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100" v-for="(item, key) in userFields" :key="key">
            <component
              :is="item.type"
              v-bind="item.props"
              v-model="item.field"
              :ref="item.props.controlName"
            >
            </component>
          </div>
          <!-- <button v-on:click="log()">XXX</button> -->
        </div>
      </md-card-content>
    </md-card>
    <!-- Other Details -->
    <md-card v-if="otherErrors.length" class="md-layout md-size-50 md-small-size-100 md-accent">
      <md-card-content>
        <ul>
          <li class="error" :key="key" v-for="(error, key) in otherErrors">
            {{ $t(error.msg, {field: error.label}) }}
          </li>
        </ul>
      </md-card-content>
    </md-card>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <md-toolbar>
          <h3 class="md-title">Other Details</h3>
          <div class="md-layout-item md-alignment-center-right">
            <md-button v-if="otherEditMode" class="md-raised" @click="doCancel('otherStoredValues', 'otherDetails', 'otherEditMode', 'otherErrors')">{{ $t('buttons.cancel') }}</md-button>
            <md-button v-if="otherEditMode" class="md-raised md-primary" @click="doSave('otherDetails', 'otherEditMode', 'otherErrors')">{{ $t('buttons.save') }}</md-button>
            <md-button v-if="!otherEditMode" class="md-raised md-primary" @click="doEdit('otherStoredValues', 'otherDetails', 'otherEditMode')">{{ $t('buttons.edit') }}</md-button>
          </div>
        </md-toolbar>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100" v-for="(item, key) in otherDetails" :key="key">
            <component
              :is="item.type"
              v-bind="item.props"
              v-model="item.field"
              :ref="item.props.controlName"
            >
            </component>
          </div>
          <!-- <button v-on:click="log()">XXX</button> -->
        </div>
      </md-card-content>
    </md-card>
    <modal-compo v-if="showModal" @close="addComponent">
      <div slot="body">
        <div v-for="(item, key) in newCompDetails" :key="key">
          <component
            :is="item.type"
            v-bind="item.props"
            v-model="item.field"
            :ref="item.props.controlName"
          >
          </component>
        </div>
      </div>
    </modal-compo>
    <md-button @click="promptModal" class="md-raised md-primary">
      {{ $t('buttons.addComponent') }}
    </md-button>
  </md-content>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import ValidationsMixin from '@/js/validations.js'
import TextCompo from '@/components/TextCompo'
import TextareaCompo from '@/components/TextareaCompo'
import RadioCompo from '@/components/RadioCompo'
import DateCompo from '@/components/DateCompo'
import ModalCompo from '@/components/ModalCompo'
import { MESSAGES } from '@/js/messages.js'
import { NEW_COMPO } from '@/js/new_component.js'

Vue.use(VueMaterial)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: MESSAGES
})

export default {
  name: 'HelloWorld',
  i18n: i18n,
  mixins: [ValidationsMixin],
  components: {
    TextCompo,
    TextareaCompo,
    RadioCompo,
    DateCompo,
    ModalCompo
  },
  data () {
    return {
      errors: [],
      editMode: false,
      otherErrors: [],
      otherEditMode: false,
      otherDetails: [
        {
          type: 'text-compo',
          props: {
            controlName: 'blah',
            label: 'blah blah',
            mandatory: true,
            readonly: true,
            minLength: 3,
            maxLength: 10
          },
          field: ''
        }
      ],
      newCompDetails: NEW_COMPO,
      userFields: [
        {
          type: 'text-compo',
          props: {
            controlName: 'username',
            label: 'labels.username',
            mandatory: true,
            readonly: true,
            minLength: 3,
            maxLength: 10
          },
          field: ''
        },
        {
          type: 'text-compo',
          props: {
            controlName: 'password',
            label: 'labels.password',
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
            label: 'labels.firstname',
            mandatory: true,
            readonly: true
          },
          field: 'Coco'
        },
        {
          type: 'text-compo',
          props: {
            controlName: 'lastname',
            label: 'labels.lastname',
            mandatory: true,
            readonly: true
          },
          field: 'The Mutt'
        },
        {
          type: 'radio-compo',
          props: {
            controlName: 'gender',
            label: 'labels.gender',
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
            label: 'labels.birthday',
            mandatory: false,
            readonly: true
          },
          field: '2018-02-22'
        }
      ],
      storedValues: {},
      otherStoredValues: {},
      showModal: false
    }
  },
  methods: {
    log: function () {
      console.log(this)
    },
    toggleEdit: function (modeInd, fields) {
      this.$data[modeInd] = !this.$data[modeInd]
      this.$data[fields].forEach(item => {
        item.props.readonly = !this.$data[modeInd]
      })
    },
    doEdit: function (store, fields, modeInd) {
      // save current values
      this.$data[store] = this.$data[fields].map(
        item => { return { fieldname: item.props.controlName, value: item.field } })
      this.toggleEdit(modeInd, fields)
    },
    doCancel: function (store, fields, modeInd, errors) {
      this.$data[store].forEach(item => {
        this.getField(this.$data[fields], item.fieldname).field = item.value
      })
      this.$data[errors] = []
      this.toggleEdit(modeInd, fields)
    },
    doSave: function (fields, modeInd, errors) {
      this.$data[errors] = this.validate(this.$data[fields])
      if (!this.$data[errors] || this.$data[errors].length === 0) {
        this.toggleEdit(modeInd, fields)
      }
    },
    getField: function (fields, fieldname) {
      var field
      fields.forEach(item => {
        if (item.props.controlName === fieldname) {
          field = item
        }
      })
      return field
    },
    getValue: function (fields, fieldname) {
      var item = this.getField(fields, fieldname)
      if (item) {
        return item.field
      }
    },
    promptModal: function () {
      this.newCompDetails.forEach(item => {
        item.field = ''
      })
      this.showModal = true
    },
    addComponent: function () {
      var ctrl = {
        type: '',
        props: {},
        field: ''
      }
      this.newCompDetails.forEach(item => {
        ctrl.props[item.props.controlName] = item.field
      })
      ctrl.type = ctrl.props.controlType === 'Text' ? 'text-compo' : (ctrl.props.controlType === 'Radio' ? 'radio-compo' : 'date-compo')
      ctrl.props.controlName = 'other' + this.otherDetails.length
      ctrl.props.mandatory = ctrl.props.mandatory === 'Yes'
      ctrl.props.minLength = parseInt(ctrl.props.minLength)
      ctrl.props.maxLength = parseInt(ctrl.props.maxLength)
      this.otherDetails.push(ctrl)
      this.showModal = false
    }
  },
  computed: {
    displayName: {
      get () {
        var firstname = this.getValue(this.userFields, 'firstname')
        var lastname = this.getValue(this.userFields, 'lastname')
        if (!firstname && !lastname) {
          return 'User'
        }
        return firstname + ' ' + lastname + '\'s'
      }
    },
    language: {
      get () {
        return this.$options.i18n.locale
      },
      set (lang) {
        this.$options.i18n.locale = lang
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li.error {
    text-align: left;
  }

  .error-box {
    max-height: 200px;
  }
</style>
