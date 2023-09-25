import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NavBar from './NavBar';
import { Button } from 'flowbite-react';
import { Table, Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [item, setItem] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const UserGet = () => {
        fetch("https://www.melivecode.com/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(true);
                    if (result.status === 'ok') {
                        setUser(result.user);
                        setLoading(false);
                    } else if (result.status === 'forbidden') {
                        MySwal.fire({
                            html: <i>{result.message}</i>,
                            icon: 'error'
                        }).then(() => {
                            navigate('/');
                        });
                    }
                    setLoading(true);
                    setItem(result);
                }
            ).catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

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
        UserGet();
    }, []);

    const UserDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "id": id
                });

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://www.melivecode.com/api/users/delete", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status === 'ok') {
                            UserGet();
                            MySwal.fire({
                                html: <i>Delete user successfully!</i>,
                                icon: 'success'
                            }).then(() => {
                                navigate('/dashboard');
                            });
                        } else {
                            MySwal.fire({
                                html: <i>Something went wrong. Please try again!</i>,
                                icon: 'error'
                            });
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        });
    }

    const logOut = () => {
        localStorage.removeItem('token');
        MySwal.fire({
            html: <i>Logout!</i>,
            icon: 'success'
        }).then(() => {
            navigate('/');
        });
    }
    console.log(user)

    return (
        <>
            {
                loading ? <div><h3>Loading....</h3></div>
                    :
                    <>
                        <NavBar logOut={logOut} user={user} />
                        <div className='container mx-auto mt-20 my-20 px-4'>
                            <div className='flex justify-between my-6'>
                                <h2 className='text-xl font-medium'>Users</h2>
                                <Button>
                                    <Link to="/addusers">Create User</Link>
                                </Button>
                            </div>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>
                                        ID
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Avatar
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Name
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Username
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Action
                                    </Table.HeadCell>
                                </Table.Head>
                                {item.map((item) => (
                                    <Table.Body key={item.id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>
                                                {item.id}
                                            </Table.Cell>
                                            <Table.Cell className="flex mx-auto">
                                                <Avatar img={item.avatar} />
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <h2> {item.fname} {item.lname}</h2>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.username}
                                            </Table.Cell>
                                            <Table.Cell className='flex'>
                                                <Link to={'/edituser/' + item.id}
                                                    className="font-medium pe-4 text-cyan-600 hover:underline dark:text-cyan-500"
                                                >
                                                    <p>
                                                        Edit
                                                    </p>
                                                </Link>
                                                <button onClick={() => UserDelete(item.id)}
                                                    className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                                                >
                                                    <p>
                                                        Delete
                                                    </p>
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                            </Table>
                        </div>
                    </>
            }

        </>
    );
}

export default Dashboard;
