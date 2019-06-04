import React from 'react';
import { MDBContainer, MDBRow, MDBCol  } from 'mdbreact';
import { connect } from "react-redux";
import  StreamForm from './StreamForm';
import {createStream} from "../../actions";

class StreamCreate extends React.Component{

    onSubmit = (formValue) => {
        this.props.createStream(formValue);
    };
    render() {
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="6" className='formCreate z-depth-2'>
                        <p className="h4 text-center py-4">Create a Stream</p>
                        <StreamForm onSubmit={this.onSubmit} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}

export default connect(null, { createStream })(StreamCreate);
