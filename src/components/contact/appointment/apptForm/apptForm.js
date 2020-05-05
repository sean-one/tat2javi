import React from 'react';

const ApptForm = (props) => {
    return (
        <form>
            <input name='name' type='text' value='' placeholder='Name' />
            <input name='phone' type='number' value='' placeholder='Phone' />
            <input name='email' type='text' value='' placeholder='Email' />
            <textarea name='description' type='text' value='' placeholder='Describe your tattoo idea' />
        </form>
    );
}

export default ApptForm;