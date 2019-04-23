import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import IssueBook from '../../components/IssueBook/IssueBook';
import Modal from '../../components/UI/Modal/Modal';
import StudentSummary from '../../components/IssueBook/StudentSummary/StudentSummary';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-issue';

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

                <IssueBook issued={this.IssueHandler} />
            </Aux>
        );
    }
}

export default WithErrorHandler(IssueBooks, axios);