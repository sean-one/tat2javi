import React, { Component } from 'react';
import axios from 'axios';

class AdminClients extends Component {
    constructor() {
        super();
        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HOSTNAME}/api/clients`)
            .then(res => {
                this.setState({
                    clients: res.data
                })
                // console.log(res.data);
            })
            .catch(err => {
                console.log('server error', err);
            });
    };

    render() {
        return (
            <div>
                <h1>clients page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Client Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.clients.map((client, key) => {
                        return (
                            <tr key={key}>
                                <td>{client.id}</td>
                                <td>{client.firstname}</td>
                                <td>{client.lastname}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{client.state}</td>
                            </tr>
                        )
                    })}</tbody>
                </table>
            </div>
        );
    }
}

export default AdminClients;
