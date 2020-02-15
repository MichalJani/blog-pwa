/* @todo - add typescript*/

import React from 'react'
import {Formik, Field, Form, FieldArray, ErrorMessage} from 'formik';
// import * as Yup from 'yup'
//import {EditorState } from 'draft-js'
// import {RichEditionExample} from './RichEdition'
// import {Debug} from '../Debug'


const initialValues = {
  friends: [
    {name: '', email: ''}
  ]
}


export const InviteFriendsForm = () => {
  return (
    <div>
      <h1>Invite friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))

          }, 500)
        }}
      >
        {() => <div>

          <div className="row">
            <div className="col">
              <Field name="name" type='text' />

            </div>
            <div className="col">
              <Field name="email" type='email' />
            </div>
            <div className="col">
              <button type='button'>x</button>
            </div>
          </div>

        </div>}
      </Formik>
    </div>
  )
}
