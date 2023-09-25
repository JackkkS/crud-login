import React, { useState, useEffect } from 'react'
import { Card } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from 'flowbite-react';


function EditUsers() {

    const { id } = useParams();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();



    useEffect(() => {
        const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }

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
            } else if (result.status === 'forbidden' || result.status === 'error') {
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
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    setFname(result.user.fname);
                    setLname(result.user.lname);
                    setUsername(result.user.username);
                    setEmail(result.user.email);
                    setAvatar(result.user.avatar);
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }, [id]);


    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/update", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>Updated user successfully!!</i>,
                        icon: 'success'
                    }).then(() => {
                        navigate('/dashboard')
                    })
                } else {
                    MySwal.fire({
                        html: <i>Something went wrong. Please try again!</i>,
                        icon: 'error'
                    })
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
       
    }, [])

    return (
        <div>
            <div className='container mx-auto my-20 px-4'>
                <div className='flex justify-start my-6'>
                    <Button color="failure" className='px-3'>
                        <Link to="/dashboard">Back</Link>
                    </Button>
                </div>
                <Card>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Update Users
                            </h2>
                        </div>


                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="fname" className="px-3 block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fname"
                                            name="fname"
                                            type="text"
                                            autoComplete="fname"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setFname(e.target.value)} value={fname}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lname" className="px-3 block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="lname"
                                            name="lname"
                                            type="text"
                                            autoComplete="lname"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setLname(e.target.value)} value={lname}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="username" className="px-3 block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            autoComplete="username"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setUsername(e.target.value)} value={username}
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="email" className="px-3 block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setEmail(e.target.value)} value={email}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="avatar" className="px-3 block text-sm font-medium leading-6 text-gray-900">
                                        Avatar
                                    </label>
                                    <div className="mt-2 flex items-center">
                                        <select
                                            id="avatar"
                                            name="avatar"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setAvatar(e.target.value)} value={avatar}

                                        >
                                            <option value="">Select Avatar URL</option>
                                            <option value="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg">Avatar 1</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png">Avatar 2</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-4-avatar-2754580_120522.png">Avatar 3</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png">Avatar 4</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-11-avatar-2754576_120520.png">Avatar 5</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043251-avatar-female-girl-woman_113291.png">Avatar 6</option>
                                            <option value="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png">Avatar 7</option>
                                        </select>
                                        {avatar && (
                                            <img
                                                src={avatar}
                                                alt="Selected Avatar"
                                                className="ml-2 w-8 h-8 rounded-full"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default EditUsers