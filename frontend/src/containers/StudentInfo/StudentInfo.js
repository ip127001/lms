import React, { Component } from 'react';

import StudentProfile from '../../components/Student/StudentProfile/StudentProfile';
import StudentBooks from '../../components/Student/StudentBooks/StudentBooks';

class StudentInfo extends Component {
    state = {
        name: '',
        roll: '',
        branch: '',
        semester: '',
        books: [],
        totalFine: null
    }

    render() {
        return (
            <div>
                <StudentProfile />
                <StudentBooks />
            </div>
        );  
    }
}

export default StudentInfo;