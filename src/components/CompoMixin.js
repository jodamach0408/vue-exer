export default {
  props: {
    value: String,
    readonly: {
      type: Boolean,
      default: false
    },
    controlName: {
      type: String,
      required: true
    },
    label: String,
    mandatory: {
      type: Boolean,
      default: false
    },
    controlType: String,
    minLength: Number,
    maxLength: Number,
    placeholder: String,
    radioOptions: String
  },
  methods: {
    updateParent: function (val) {
      this.$emit('input', val)
    }
  }
}
