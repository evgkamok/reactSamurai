import React from "react"
import styles from './FormControl.module.css'
import {WrappedFieldProps} from "redux-form"

export const TextArea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
  const hasError = meta.error && meta.touched
  return (
    <div className={(hasError ? styles.error : '')}>
      <textarea cols={50} rows={5} {...input} {...props}/>
      <div>
        {hasError && <span>{meta.error}</span>}
      </div>
    </div>
  )
}
export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
  const hasError = meta.error && meta.touched
  return (
    <div className={(hasError ? styles.error : '')}>
      <input {...input} {...props}/>
      <div>
        {hasError && <span>{meta.error}</span>}
      </div>
    </div>
  )
}