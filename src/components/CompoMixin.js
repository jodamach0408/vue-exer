export default {
  props: {
    value: String,
    readonly: Boolean,
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
    validate: function () {
      console.log(this.$refs.self.value)
    },
    updateParent: function (val) {
      console.log(val)
      this.$emit('input', val)
    }
  }
}
