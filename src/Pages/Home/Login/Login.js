import { GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../assets/images/login/login.svg';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const { signInUser, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                setSuccess("User created successfully");
                navigate(from, { replace: true });
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
                navigate(from, { replace: true });
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
                    <h1 className="text-5xl font-bold text-center mt-6">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className='text-center'>
                        <p className="text-xl">Or sign in with google</p>
                        <button onClick={handleSignInWithGoogle}>
                            <FaGoogle className='text-5xl p-2 mt-2 bg-neutral-200 rounded-3xl border-4'></FaGoogle>
                        </button>
                    </div>
                    <p className='text-center my-5'>New to Genius Car? <Link className='text-orange-600 font-semibold' to='/register'>Register</Link> </p>
                    <div className='my-5 text-center'>
                        <p className='text-green-600'>{success}</p>
                        <p className='bg-error'>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;