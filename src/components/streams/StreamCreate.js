import React from 'react';
import { Field, reduxForm } from "redux-form";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon  } from 'mdbreact';

class StreamCreate extends React.Component{
    renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <div>
                    <p className='text-danger'>{error}</p>
                </div>
            );
        }
    };
    renderInput = ({input, label, meta}) => {
        return (
            <div>
                <label
                    htmlFor="defaultFormCardNameEx"
                    className="grey-text font-weight-light"
                >
                    {label}
                </label>
                <input {...input} autoComplete='off' type="text" id="defaultFormCardNameEx" className="form-control mb-3" />
                {this.renderError(meta)}
            </div>
        );
    };
    onSubmit(formValue) {
        console.log('formValue: ', formValue)
    }
    render() {
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="6">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formCreate z-depth-2'>
                            <p className="h4 text-center py-4">Create a Stream</p>

                            <Field name='title' component={this.renderInput} label='Enter title' />
                            <Field name='description' component={this.renderInput} label='Enter description'/>


                            <div className="text-center py-4 mt-3">
                                <MDBBtn className="btn btn-outline-purple" type="submit">
                                    Submit
                                    <MDBIcon far icon="paper-plane" className="ml-2" />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
const validate = formValue => {
    const error = {};
    if (!formValue.title) {
        error.title = 'You must enter a title';
    }
    if (!formValue.description) {
        error.description = 'You must enter a description';
    }
    return error;
};
export default reduxForm({
    form: 'StreamCreate',
    validate: validate
})(StreamCreate);
