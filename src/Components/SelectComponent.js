import { Select } from '@shopify/polaris'
import React, { useState } from 'react'

const SelectComponent = (props) => {
  var [childSelect,setChildSelect]=useState(props.selected)

  return (
  <Select label='Sub Category' options={props.options} value={childSelect} 
  onChange={(e)=>{props.handleSelectChange(e,props.index);setChildSelect(e)}}/>
  )
}

export default SelectComponent