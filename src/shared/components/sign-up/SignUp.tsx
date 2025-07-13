'use client';
import './sign-up.css'
import { JSX, useState } from 'react';
import Link from 'next/link';

import { useAppDispatch } from '@/shared/store';
import {
  validateRepeatedPassword,
  validateEmail,
  validatePassword,
  validateUserName
} from '../../utils'
import { CreateUserDto } from '@/shared/types';
import { createUser } from '@/shared/store/async-actions/auth/auth-async-actions';

type RegisterPageForm = CreateUserDto & {
    repeatPassword: string;
};

type FormErrors = Partial<RegisterPageForm> & {
    general?: string;
};

export function SignUp(): JSX.Element {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<RegisterPageForm>({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({});

     const validateForm = (): boolean => {
        const newErrors = {
            username: validateUserName(formData.name),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword: validateRepeatedPassword(formData.password, formData.repeatPassword)
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== undefined);
    };

     const handleFieldValidation = (name: string, value: string): void => {
        let error: string | undefined;
        
        switch (name) {
            case 'username':
                error = validateUserName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                if (formData.repeatPassword) {
                    setErrors(prev => ({
                        ...prev,
                        repeatPassword: validateRepeatedPassword(value, formData.repeatPassword)
                    }));
                }

                break;
            case 'repeatPassword':
                error = validateRepeatedPassword(formData.password, value);
                break;
            default:
                break;
            }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    
        // Очищаем ошибку при изменении поля
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        setTimeout(() => {
            handleFieldValidation(name, value);
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, general: undefined }));

        try {
            await dispatch(createUser(formData));
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return <section className="register">
        <h1 className="register__title">Sign Up</h1>
        {
            errors.general && (
                <div className="register__error">
                    {errors.general}
                </div>
            )
        }
        <form className="register__form form" onSubmit={handleSubmit}>
            <div className="register__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Your name</label>
                <input
                    className={`register__input form__input ${errors.name ? 'input-error' : ''}`}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <span className="register__error-message">{errors.name}</span>}
            </div>
            <div className="register__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Email</label>
                    <input
                    className={`register__input form__input ${errors.email ? 'input-error' : ''}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="register__error-message">{errors.email}</span>}
            </div>
            <div className="register__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                    className={`register__input form__input ${errors.password ? 'input-error' : ''}`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="register__error-message">{errors.password}</span>}
            </div>
                <div className="register__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Confirm password</label>
                <input
                    className={`register__input form__input ${errors.repeatPassword ? 'input-error' : ''}`}
                    type="password"
                    name="repeatPassword"
                    placeholder="Confirm password"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                />
                {errors.repeatPassword && <span className="register__error-message">{errors.repeatPassword}</span>}
                </div>
            <button className="register__submit form__submit button" type="submit">
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
        <div className="register__login">
            <span>Already have an account? </span>
            <Link href="/login" className="register__login-link">Sign In</Link>
        </div>
    </section>
}
