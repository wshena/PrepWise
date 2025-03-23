'use client'

import {z} from 'zod'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {toast} from 'sonner'
import Image from 'next/image'
import Link from 'next/link'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { signin, signup } from '@/lib/actions/auth.action'

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({type}:{type: FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const {name, email, password} = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signup({
          uid: userCredentials.user.uid,
          name: name!,
          email: email,
          password: password
        })

        if (!result?.success) {
          toast.error(result?.message);
          return
        }

        toast.success('Account created successfully, Please sign in');
        router.push('/sign-in')
      } else {
        const {email, password} = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error('Sign in failed');
          return;
        }

        await signin({
          email, idToken
        })

        toast.success('Sign in successfully');
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an erro: ${error}`)
    }
  }

  const isSignin = type === 'sign-in'
  
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col items-center gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={'/logo.svg'} alt='logo' height={32} width={38} />
          <h2 className='text-primary-100'>PrepWise</h2>
        </div>
        <h3 className='text-white'>Practice job interview with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignin && (
              <FormField control={form.control} name='name' label='Name' placeholder='Your Name' type='text' />
            )}
            <FormField control={form.control} name='email' label='Email' placeholder='Your Email Address' type='email' />
            <FormField control={form.control} name='password' label='Password' placeholder='Your Password' type='password' />
            <Button className='btn' type="submit">
              {isSignin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          <p className="text-center">
            {isSignin ? 'No account yet?' : 'Have an account already?'}
            <Link href={!isSignin ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
              {!isSignin ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default AuthForm