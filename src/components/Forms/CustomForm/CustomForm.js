/* @todo - add typescript*/

import React from 'react';

class CustomFormAbstraction extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {},
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    event.persist();

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = (event) => {
    const target = event.target;

    const name = target.name;
    event.persist();

    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  handleSubmit = e => {
    e.preventDefault()
    // @todo - add validation

    this.props.onSubmit(this.props.values)

  }

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSUbmit
    });
  }
}

export class CustomForm extends React.Component {
  render() {
    return (
      <CustomFormAbstraction
        initialValues={{
          isGoing: true,
          numberOfGuests: 2,
        }}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >
        {props => {
          const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <input
                name="isGoing"
                type="checkbox"
                className="checkbox"
                checked={values.isGoing}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <label>Is going:</label>
              <br />
              <label>
                NumberofGuests:
                <input
                  name="numberOfGuests"
                  type="number"
                  className="numberOfGuests"
                  checked={values.numberOfGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </form>
          );
        }}
      </CustomFormAbstraction >
    );
  }
}
