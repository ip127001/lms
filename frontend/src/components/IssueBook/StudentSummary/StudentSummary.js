import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const StudentSummary = (props) => {
    return (
        <Aux>
            <ul>
                <li>hi</li>
            </ul>
            <p>continue to checkout</p>
            <Button btnType="Danger" clicked={props.issueCancelHandler}>Cancel</Button>
            <Button btnType="Success" clicked={props.issueSuccessHandler}>Success</Button>
        </Aux>
    )
}

export default StudentSummary;