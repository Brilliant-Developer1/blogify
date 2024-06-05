'use client';
import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import GoogleLogin from '@/components/Login-Registration/GoogleLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';

const LoginComponent = () => {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  useEffect(() => {
    if (user) {
      router.replace(from);
    }
  }, [user, from, router]);

  const handleSUbmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left max-w-96">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSUbmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div>
                  <p>
                    New user? please register <Link className="link" href="/signup">here </Link>
                  </p>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-outline btn-neutral rounded">
                    Login
                    <LogIn />
                  </button>
                </div>
                <div className="mt-6">
                  <GoogleLogin />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Login = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginComponent />
  </Suspense>
);

export default Login;
