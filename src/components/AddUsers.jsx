import React, { useState, useEffect } from 'react'
import { Card } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button } from 'flowbite-react';

function AddUsers() {

    const [inputs, setInputs] = useState({});
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

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
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "username": inputs.username,
            "password": inputs.password,
            "email": inputs.email,
            "avatar": inputs.avatar
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>Created user successfully!!</i>,
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

        console.log(inputs);

       
    }

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
                                Create Users
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
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={inputs.fname || ""}
                                            onChange={handleChange}
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
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={inputs.lname || ""}
                                            onChange={handleChange}
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
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={inputs.username || ""}
                                            onChange={handleChange}
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
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={inputs.email || ""}
                                            onChange={handleChange}
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
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
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
                                        {inputs.avatar && (
                                            <img
                                                src={inputs.avatar}
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
                                        Create
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

export default AddUsers