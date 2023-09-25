import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {

    const [inputs, setInputs] = useState({});
    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": inputs.username,
            "password": inputs.password,
            "expiresIn": 600000
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>Login successfully!</i>,
                        icon: 'success'
                    }).then(() => {
                        localStorage.setItem('token', result.accessToken)
                        navigate('/profile')
                    })
                } else {
                    MySwal.fire({
                        html: <i>Login fail try again!</i>,
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
                <Card>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Login to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
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
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>

                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={inputs.password || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login