"use client";

import { Button } from '@ui/components/ui/button'
import React from 'react'
import InputField from '../../components/InputField'
import FooterLink from '../../components/FooterLink'
import { toast } from '@ui/components/ui/sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import SocialProviders from '../../components/SocialProviders';

const SignUpPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onBlur'
    },);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            // const result = await signUpWithEmail(data);
            // if (result.success) router.push('/');
            router.push('/')
        } catch (e) {
            console.error(e);
            toast.error('Sign up failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account.'
            })
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold flex gap-4 justify-center text-center text-gray-900 mb-10">Sign Up & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: 'Full name is required', minLength: 2 }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: { value: /^\w+@\w+\.\w+$/, message: 'Please enter a valid email address' } }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="h-[52px] cursor-pointer bg-[#171717] hover:bg-gray-800 text-white font-medium text-base rounded-lg shadow-lg disabled:opacity-50 w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your  Journey'}
                </Button>

                <div className="flex items-center my-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="mx-3 text-gray-400 text-sm font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <SocialProviders variant='sign-up' />

                <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
            </form>
        </>
    )
}

export default SignUpPage