import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import NavBar from './NavBar';


function Profile() {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/auth/user", requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoading(true)
                if (result.status === 'ok') {
                    setUser(result.user)
                    setLoading(false)
                } else if (result.status === 'forbidden'|| result.status === 'error') {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'error'
                    }).then(() => {
                        navigate('/')
                    })
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    function logOut() {
        localStorage.removeItem('token')
        MySwal.fire({
            html: <i>Logout!</i>,
            icon: 'success'
        }).then(() => {
            navigate('/')
        })
    }

    return (
        <div>
            {
                loading ? <div><h3>Loading....</h3></div>
                    :
                    <>
                        <NavBar logOut={logOut} user={user} />
                        <div className='container mx-auto mt-20 my-20 px-4'>
                            <div className="flex shadow-2xl items-center justify-center">
                                <div className="max-w-2xl py-20">
                                    <h1 className='text-center pb-4 text-4xl font-bold'>My profile</h1>
                                    <img className='w-80 py-10' src={user.avatar} alt={user.username} />
                                    <h2 className='text-center pb-4 text-xl font-semibold'>Name : {user.fname} {user.lname}</h2>
                                    <h2 className='text-center pb-4  text-xl font-semibold'>Username : {user.username} </h2>
                                    <h2 className='text-center pb-4  text-xl font-semibold'>Email : {user.email}</h2>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>


    )
}

export default Profile