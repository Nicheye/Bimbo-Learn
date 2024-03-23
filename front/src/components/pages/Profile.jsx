import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Consumer_profile from '../elements/Consumer_profile';
import Creator_profile from '../elements/Creator_profile';
import Message from '../elements/Message';

const Profile = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';
        } else {
            (async () => {
                try {
                    const { data } = await axios.get(
                        'http://127.0.0.1:8000/api/v1/profile',
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true
                        }
                    );
                    setData(data.data);
					
                    setStatus(data.status);
                    if (data.message) {
                        setMessage(data.message);
                    }
                } catch (e) {
                    console.log('not auth');
                }
            })();
        }
    }, []);

    if (message !== '') {
        return <Message message={message} />;
    } else {
		
        if (status === 'consumer') {
            return <Consumer_profile data={data} />;
        } else if (status === 'creator') {
            return <Creator_profile data={data} />;
        }
    }

    // If none of the conditions are met, you need to return something.
    return null;
};

export default Profile;
