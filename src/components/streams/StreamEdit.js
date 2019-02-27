import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{ //props are coming from react-router-dom

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render(){
    if(!this.props.stream){
      return <div>loading</div>
    }else {
      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm 
            initialValues={_.pick(this.props.stream, 'title', 'description')} 
            onSubmit={this.onSubmit}
          />
        </div>
      );
    };
}
};
// initialValues is a function provided by redux form library
// the initial values are set in the name prop of the parent component
// the name values are the keys in the object provided to initialValues
// ex: name='title' name='description'
// here lodash _.pick() is being used to select specific key value pairs
// from the object passed to the initialValues that will then be sent to update
// the api



// ownProps is the second parameter of mapStateToProps
// it refers to the props passed down to the component 
// this allows you to use props and the state in your store in redux
const mapStateToProps = (state, ownProps) => { 
  return { stream: state.streams[ownProps.match.params.id] } //this puts specified props into
  // the redux store, which then passes it down to props, so now
  // you can use it in the component as part of props 
}

export default connect(
  mapStateToProps,
  { fetchStream, editStream } // editStream is the action that will be dispatched to update the api
  )(StreamEdit);