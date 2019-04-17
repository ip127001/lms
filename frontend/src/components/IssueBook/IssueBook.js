import React from 'react';

import Search from './Search/Search';
import Aux from '../../hoc/Aux/Aux';

const IssueBook = (props) => {
    return (
        <Aux>
            <Search />
        </Aux>
    );
}

export default IssueBook;