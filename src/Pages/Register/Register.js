import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const Register = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const { createUser, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        const from = event.target;
        const name = from.email.name;
        const email = from.email.value;
        const password = from.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                from.reset();
                setSuccess("User created successfully");
                navigate('/');
                console.log(user);
            })
            .catch(error => {
                setError(error.message);
            })
        setError('');
    }

    const handleSignInWithGoogle = () => {
        signInGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                navigate('/');
                console.log(user);
            })
            .catch(error => {
                setError(error.message);
            })
        setError('');
    }


    return (
        <div className="hero my-20 w-full">
            <div className="hero-content grid gap-4 md:grid-cols-2 flex-col  lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={img} alt="" className='w-3/4' />
                </div>
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold text-center mt-6">Register</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                    <div className='text-center'>
                        <p className="text-xl">Or sign up with google</p>
                        <button onClick={handleSignInWithGoogle}>
                            <FaGoogle className='text-5xl p-2 mt-2 bg-neutral-200 rounded-3xl border-4'></FaGoogle>
                        </button>
                    </div>
                    <p className='text-center my-5'>Already have an account? <Link className='text-orange-600 font-semibold' to='/login'>Login</Link> </p>
                    <div className='my-5 text-center'>
                        <p className='text-green-600'>{success}</p>
                        <p className='bg-error'>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;