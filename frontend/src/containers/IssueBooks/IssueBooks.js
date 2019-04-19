import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import IssueBook from '../../components/IssueBook/IssueBook';
import Form from '../../components/IssueBook/Form/Form';
import Modal from '../../components/UI/Modal/Modal';
import StudentSummary from '../../components/IssueBook/StudentSummary/StudentSummary';

class IssueBooks extends Component {
    state = {
        studentInfo: {
            name: 'rohit',
            roll: 'bt15cs018',
            branch: 'cse',
            semester: '8th'
        },
        issuing: false
    }

    IssueHandler = () => {
        this.setState({issuing: true})
    }

    IssueSuccessHandler = () => {
        alert('you succeded');
    }

    IssueCancelHandler = () => {
        this.setState({issuing: false})
    }
    
    render() {
        return( 
            <Aux>
                <Modal show={this.state.issuing} modalClosed={this.IssueCancelHandler}>
                    <StudentSummary issueSuccessHandler={this.IssueSuccessHandler} issueCancelHandler={this.IssueCancelHandler}/>
                </Modal>

                <IssueBook />

                <Form issued={this.IssueHandler} />
            </Aux>
        );
    }
}

export default IssueBooks;