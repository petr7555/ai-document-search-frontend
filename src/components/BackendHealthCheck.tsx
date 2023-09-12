import React, {useEffect} from 'react';
import getBackendHealth from "../api/getBackendHealth";

const BackendHealthCheck = () => {
    const [health, setHealth] = React.useState('loading...');

    useEffect(() => {
        getBackendHealth().then(setHealth);
    }, []);

    return (
        <>
            <div>Connection to backend:</div>
            <pre>
                {health}
            </pre>
        </>
    );
}

export default BackendHealthCheck;
