import React, { Component } from 'react';
import axios from 'axios';
import dateFns from 'date-fns';

class AdminEvents extends Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        };
    }

    handleChange = e => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    };

    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // validate event_name | notNullable
        if (!fields["event_name"]) {
            formIsValid = false;
            errors["event_name"] = "* Please enter a event name.";
        }
        
        // validate event_details | notNullable
        if (!fields["event_details"]) {
            formIsValid = false;
            errors["event_details"] = "* Please enter event details.";
        }
        
        // validate event_image | notNullable
        if (!fields["event_image"]) {
            formIsValid = false;
            errors["event_image"] = "* Please enter a link to the event image.";
        }

        // validate event_startDate | notNullable, validate date
        if (!fields["event_startDate"]) {
            formIsValid = false;
            errors["event_startDate"] = "* Please enter a event start date.";
        }

        if (typeof fields["event_startDate"] !== "undefined") {
            if (!dateFns.isValid(new Date(fields["event_startDate"]))) {
                formIsValid = false;
                errors["event_startDate"] = "* Please enter start date as specified. "
            }
        }

        // validate event_endDate | notNullable, validate date
        if (!fields["event_endDate"]) {
            formIsValid = false;
            errors["event_endDate"] = "* Please enter a event end date.";
        }

        if (typeof fields["event_endDate"] !== "undefined") {
            if (!dateFns.isValid(new Date(fields["event_endDate"]))) {
                formIsValid = false;
                errors["event_endDate"] = "* Please enter end date as specified. "
            }
        }

        this.setState({
            errors: errors
        });

        return formIsValid;
    }

    submitEvent = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["event_name"] = "";
            fields["event_details"] = "";
            fields["event_startDate"] = "";
            fields["event_endDate"] = "";
            fields["event_link"] = "";
            fields["event_image"] = "";
            this.setState({fields:fields});
            alert("submitted");
        }
        // else {
        //     axios.post(`${process.env.REACT_APP_HOSTNAME}/api/events`, {
        //         event_name: this.state.event_name,
        //         event_startDate: this.state.event_startDate,
        //         event_endDate: this.state.event_endDate,
        //         event_details: this.state.event_details,
        //         event_link: this.state.event_link,
        //         event_image: this.state.event_image
        //     })
        //         .then(res => {
        //             this.setState({
        //                 event_name: '',
        //                 event_startDate: '',
        //                 event_endDate: '',
        //                 event_details: '',
        //                 event_link: '',
        //                 event_image: ''
        //             });
        //             const entries = Object.entries(this.state);
        //             for (const [stateKey, stateValue] of entries) {
        //                 document.getElementById(stateKey).style.color = "black";
        //             };
        //         })
        //         .catch(err => {
        //             console.log('there has been an error', err);
        //         });
        // }
    }

    render() {
        return (
            <div>
                <h1>events posting page</h1>
                <form id="eventForm">
                    <div>
                        <p id="event_name">Event Name:</p><input type="text" name="event_name" placeholder="Event Name" value={this.state.fields.event_name || ''} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.event_name}</div>
                    </div>
                    <div>
                        <p id="event_startDate">Date Start:</p><input type="text" name="event_startDate" placeholder="mm/dd/yyyy" value={this.state.fields.event_startDate || ''} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.event_startDate}</div>
                        <p id="event_endDate">Date End:</p><input type="text" name="event_endDate" placeholder="mm/dd/yyyy" value={this.state.fields.event_endDate || ''} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.event_endDate}</div>
                    </div>
                    <p id="event_details">Event Discription:</p>
                    <textarea rows="10" cols="30" name="event_details" placeholder="Details about event..." value={this.state.fields.event_details || ''} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.event_details}</div>
                    <div>
                        <p id="event_link">Event Link:</p><input type="text" name="event_link" placeholder="https://www.example.com" value={this.state.fields.event_link || ''} onChange={this.handleChange} />
                    </div>
                    <div>
                        <p id="event_image">Image Link:</p><input type="text" name="event_image" placeholder="https://www.pictures.com/funny_image.png" value={this.state.fields.event_image || ''} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.event_image}</div>
                    </div>
                    <button type="submit" value="submit" onClick={this.submitEvent}>Submit</button>
                </form>
            </div>
        );
    }
}

export default AdminEvents;
