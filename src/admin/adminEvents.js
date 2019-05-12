import React, { Component } from 'react';

class AdminEvents extends Component {
    render() {
        return (
            <div>
                <h1>events posting page</h1>
                <form>
                    <div>
                        <p>Event Name:</p><input type="text" name="event_name" />
                    </div>
                    <div>
                        <p>Date Start:</p><input type="text" name="event_startDate"/>
                        <p>Date End:</p><input type="text" name="event_endDate"/>
                    </div>
                    <p>Event Discription:</p>
                    <textarea rows="10" cols="30" name="event_details"/>
                    <div>
                        <p>Event Link:</p><input type="text" name="event_link" />
                    </div>
                    <div>
                        <p>Image Link:</p><input type="text" name="event_image" />
                    </div>
                    <button type="submit" value="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AdminEvents;
