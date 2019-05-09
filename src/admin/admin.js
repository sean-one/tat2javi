import React, { Component } from 'react';

// admin pages
import AdminCalendar from './adminCalendar';
import AdminClients from './adminClients';
import AdminEvents from './adminEvents';
import AdminPost from './adminPost';

class Admin extends Component {
    render() {
        return (
            <div>
                <h1>this is the admin page</h1>
                <AdminCalendar />
                {/* <AdminClients />
                <AdminEvents />
                <AdminPost /> */}
            </div>
        );
    }
}

export default Admin;
