import React from 'react';

import Search from './Search/Search';
import Form from './Form/Form';
import Aux from '../../hoc/Aux/Aux';

const IssueBook = (props) => {
    return (
        <Aux>
            <Search />
            <Form issued={props.issued} />
        </Aux>
    );
}

export default IssueBook;