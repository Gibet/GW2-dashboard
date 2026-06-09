import React, { useState } from 'react';
import GW2 from '../service/api';


//this component is used to verify the api key and store it in the local storage if it is valid
const KeyForm = () => {

    const verifyKey = async () => {
        let key = document.getElementById('api-key').value;
        let valid = await GW2.validate(key)

        if(valid){
            localStorage.setItem('api_key', key)
            alert('Valid key')
        } else {
            alert('Invalid key')
        }
    }

    return <div id='key_form'>
        <input id='api-key' type="text" placeholder='API key'/>
        <button onClick={verifyKey}>Submit</button>
    </div>
}

export default KeyForm