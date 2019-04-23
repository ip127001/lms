import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class StudentSummary extends Component {
    render() {
        return (
            <Aux>
                <ul>
                    <li>hi</li>
                </ul>
                <p>Confirm to issue the book</p>
                <Button btnType="Danger" clicked={this.props.issueCancelHandler}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.issueSuccessHandler}>Confirm</Button>
            </Aux>
        );
    }
}

export default StudentSummary;