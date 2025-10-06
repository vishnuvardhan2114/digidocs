"use client"
import { Button } from '@ui/components/ui/button'
import React from 'react'
import FooterLink from '../../components/FooterLink'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import InputField from '../../components/InputField'
import { toast } from "@ui/components/ui/sonner";
import SocialProviders from '../../components/SocialProviders'
import Wavehand from "@/public/waving-hand.svg"
import Image from 'next/image'

const SignInPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            // const result = await signInWithEmail(data);
            // if (result.success) router.push('/');
            router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }
    return (
        <>
            <h1 className="text-4xl font-bold flex gap-4 justify-center text-center text-gray-900 mb-10">
                <p className='flex gap-4'>
                    Welcome back to DigiDocs <Image src={Wavehand} alt="Waving hand" width={42} height={32} />
                </p>
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@digidocs.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="h-[52px] cursor-pointer bg-[#171717] hover:bg-gray-800 text-white font-medium text-base rounded-lg shadow-lg disabled:opacity-50 w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <div className="flex items-center my-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="mx-3 text-gray-400 text-sm font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <SocialProviders variant='sign-in' />

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    )
}

export default SignInPage