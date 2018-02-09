export default {
  methods: {
    validate (fields) {
      var errors = []
      fields.forEach(item => {
        if (item.props.mandatory) {
          this.performValidation(this.validateMandatory, item, errors)
        }
        if (item.props.minLength && item.props.minLength > 0) {
          this.performValidation(this.validateMinLength, item, errors)
        }
        if (item.props.maxLength && item.props.maxLength > 0) {
          this.performValidation(this.validateMaxLength, item, errors)
        }
      })
      return errors
    },
    performValidation (func, item, errors) {
      var err = func(item)
      if (err) {
        errors.push({
          fieldname: item.props.controlName,
          label: this.$i18n.t(item.props.label),
          msg: err
        })
      }
    },
    validateMandatory (item) {
      console.log(item)
      if (!item.field) {
        return 'errors.mandatory'
      }
    },
    validateMinLength (item) {
      if (item.field && item.field.length < item.props.minLength) {
        return 'errors.minLength'
      }
    },
    validateMaxLength (item) {
      if (item.field && item.field.length > item.props.maxLength) {
        return 'errors.maxLength'
      }
    }
  }
}
