import React from 'react';
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import {MDBListGroup, MDBListGroupItem, MDBContainer, MDBIcon, MDBBtn  } from "mdbreact";
import { Link } from "react-router-dom";

class StreamList extends React.Component{
    componentDidMount() {
        this.props.fetchStreams();
    }
    renderList() {
        return this.props.streams.map(stream => {
            return (
                    <MDBListGroupItem className='d-flex text-info' color="light" key={stream.id}>
                        <div>
                            <MDBIcon className='pt-2 mr-3' fab icon="youtube-square fa-3x"  />
                        </div>
                        <div>
                            <h3>{stream.title}</h3>
                            <p className='text-muted'>{stream.description}</p>
                        </div>
                        <div className='ml-auto pt-3'>{this.renderAdmin(stream)}</div>
                    </MDBListGroupItem>
            );
        })
    };
    renderAdmin = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='text-white'>
                    <Link to={`/streams/edit/${stream.id}`}><MDBBtn className='font-weight-bold' size='sm' gradient="aqua">Edit</MDBBtn></Link>
                    <MDBBtn className='font-weight-bold' size='sm' gradient="peach">Delete</MDBBtn>
                </div>
            );
        }
    };
    renderCreate() {
        if (this.props.isSignedIn) {
            return (<div>
                <Link to='/streams/new'>
                    <MDBBtn size='sm' className='text-light font-weight-bold' gradient="purple">Create Stream</MDBBtn>
                </Link>
            </div>)
        }
    }
    render() {
        return (
            <MDBContainer >
                <div className='d-flex justify-content-between mt-5' style={{ width: "42rem" }}>
               <h2 className='font-weight-bold pl-4  text-info'>Streams</h2>
                {this.renderCreate()}
                </div>
                <MDBListGroup className="my-4 mx-4" style={{ width: "40rem" }}>
                    {this.renderList()}
                </MDBListGroup>
            </MDBContainer>
        );
    }
}
const mapStateToProps = state => {
    return { streams: Object.values(state.streams), currentUserId: state.auth.userId, isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
