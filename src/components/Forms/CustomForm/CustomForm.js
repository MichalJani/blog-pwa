/* @todo - add typescript*/

import React from 'react';

class CustomFormAbstraction extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {},
  };

  handleChange = ( event ) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    /*  Some properties in an event change as the event bubbles up. Since setState is async, by calling event.persist() we can guarantee that when the setState does happen, the event data that we're setting is the same as when handleChange was originally called. 
    "If you want to access the event properties in an asynchronous way, you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code." */
    event.persist();

    this.setState( prevState => ( {
      values: {
        ...prevState.values,
        [ name ]: value,
      },
    } ) );
  };

  handleBlur = ( event ) => {
    const target = event.target;

    const name = target.name;
    event.persist();

    this.setState( prevState => ( {
      touched: {
        ...prevState.touched,
        [ name ]: true,
      },
    } ) );
  };

  handleSubmit = e => {
    e.preventDefault()
    // @todo - add validation

    this.props.onSubmit( this.props.values )

  }

  render() {
    return this.props.children( {
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSUbmit
    } );
  }
}

export class CustomForm extends React.Component {
  render() {
    return (
      <CustomFormAbstraction
        initialValues={ {
          isGoing: true,
          numberOfGuests: 2,
        } }
        onSubmit={ values => alert( JSON.stringify( values, null, 2 ) ) }
      >
        { props => {
          const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <form onSubmit={ handleSubmit }>
              <input
                name="isGoing"
                type="checkbox"
                className="checkbox"
                checked={ values.isGoing }
                onChange={ handleChange }
                onBlur={ handleBlur }
              />

              <label>Is going:</label>
              <br />
              <label>
                NumberofGuests:
                <input
                  name="numberOfGuests"
                  type="number"
                  className="numberOfGuests"
                  checked={ values.numberOfGuests }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                />
              </label>
              <pre>{ JSON.stringify( props, null, 2 ) }</pre>
            </form>
          );
        } }
      </CustomFormAbstraction >
    );
  }
}




/**
 * Recursively a set the same value for all keys and arrays nested object, cloning
 * @param object
 * @param value
 * @param visited
 * @param response
 */
export function setNestedObjectValues(
  object,
  value,
  visited = new WeakMap(),
  response = {}
) {
  /** @private is the given thing an Object? */
  const isObject = obj => obj !== null && typeof obj === 'object';

  for ( let k of Object.keys( object ) ) {
    const val = object[ k ];
    if ( isObject( val ) ) {
      if ( !visited.get( val ) ) {
        visited.set( val, true );
        // In order to keep array values consistent for both dot path  and
        // bracket syntax, we need to check if this is an array so that
        // this will output  { friends: [true] } and not { friends: { "0": true } }
        response[ k ] = Array.isArray( val ) ? [] : {};
        setNestedObjectValues( val, value, visited, response[ k ] );
      }
    } else {
      response[ k ] = value;
    }
  }

  return response;
}
