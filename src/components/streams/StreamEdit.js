import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import {fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

class StreamEdit extends React.Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    };
    render() {
        if (!this.props.streams) {
            return <div>Loading...</div>
        }
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="6" className='formCreate z-depth-2'>
                        <p className="h4 text-center py-4">Edit a Stream</p>
                        <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.streams, 'title', 'description')}/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {streams: state.streams[ownProps.match.params.id]}
};
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
