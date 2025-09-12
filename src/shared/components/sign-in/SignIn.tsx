'use client'
import './sign-in.css';
import Link from 'next/link';
import React from 'react';
import { JSX, useState } from 'react';
import { validateEmail, validatePassword } from '@/shared/utils';
import { AuthUserDto } from '@/shared/types';
import { useAppDispatch } from '@/shared/store';
import { loginUser, whoAmI } from '@/shared/store/async-actions/auth/auth-async-actions';

type AuthFormErrors = Partial<AuthUserDto> & {
    general?: string | null;
}

export function SignIn(): JSX.Element {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [errors, setErrors] = useState<AuthFormErrors>({});

    const validateForm = (): boolean => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        };

        setErrors(errors);
        
        return Object.values(errors).every((error) => error === undefined);
    }


    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = evt.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (errors[name as keyof AuthFormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
        evt.preventDefault();
    
        const isValidForm = validateForm();
        
        if (!isValidForm) {
            return;
        }

        setIsSubmitting(true);
        setErrors(prev => ({...prev, general: null}))

        try {
            await dispatch(loginUser(formData));
            await dispatch(whoAmI());
        } finally {
            setIsSubmitting(false);
        }
    } 


    return <section className="login">
        {
            errors.general && (
                <div className="login__error">
                    {errors.general}
                </div>
            )
        }
        <h1 className="login__title">Sign In</h1>
        <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input 
                    className="login__input form__input" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                    value={formData.email}
                    required />
            </div>
            {errors.email && <span className="login__error-message">{errors.email}</span>}
            <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input 
                    className="login__input form__input"
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password} 
                    required />
            </div>
            {errors.password && <span className="login__error-message">{errors.password}</span>}

            <button className="login__submit form__submit button" type="submit">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
        <div className="login__register">
            <span>Don&apos;t have an account? </span>
            <Link href="/register" className="login__register-link">Sign Up</Link>
        </div>
    </section>
}
