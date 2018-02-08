export const NEW_COMPO = [
  {
    type: 'text-compo',
    props: {
      controlName: 'label',
      label: 'labels.label',
      mandatory: true
    },
    field: ''
  },
  {
    type: 'radio-compo',
    props: {
      controlName: 'controlType',
      label: 'labels.controlType',
      mandatory: true,
      radioOptions: 'Text\nRadio\nDate'
    },
    field: 'Text'
  },
  {
    type: 'radio-compo',
    props: {
      controlName: 'mandatory',
      label: 'labels.mandatory',
      mandatory: true,
      radioOptions: 'Yes\nNo'
    },
    field: 'Yes'
  },
  {
    type: 'text-compo',
    props: {
      controlName: 'minLength',
      label: 'labels.minLength',
      mandatory: false
    },
    field: ''
  },
  {
    type: 'text-compo',
    props: {
      controlName: 'maxLength',
      label: 'labels.maxLength',
      mandatory: false
    },
    field: ''
  },
  {
    type: 'text-compo',
    props: {
      controlName: 'placeholder',
      label: 'labels.placeholder',
      mandatory: false
    },
    field: ''
  },
  {
    type: 'textarea-compo',
    props: {
      controlName: 'radioOptions',
      label: 'labels.options',
      mandatory: false
    },
    field: ''
  }
]
