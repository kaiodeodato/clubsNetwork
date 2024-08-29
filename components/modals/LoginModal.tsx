"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const router = useRouter();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const onToggle = useCallback(()=> {
        if(isLoading) return;

        RegisterModal.onOpen();
        loginModal.onClose();
    },[isLoading, RegisterModal, loginModal])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                router.push('/');
                loginModal.onClose();
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password, router]);

    const bodyContent = (
        <div className="flex flex-col justify-center gap-4">
            <span className="text-sm text-red-400 flex justify-center items-center blink">
            Notice: Database is reset daily at <br/> 10:00 GMT for security reasons.
            </span>
            <Input 
                placeholder="Emal" 
                onChange={(e)=> setEmail(e.target.value)} 
                value={ email }
                disabled={ isLoading }
            />
            <div className="flex flex-row justify-center items-center">
                <Input 
                    placeholder="Password" 
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    disabled={isLoading}
                />
                <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="text-purple-800 mt-1 absolute right-8"
                >
                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20}/>}
                </button>
            </div>
        </div>

    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="text-xs">First time using twitter? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline text-xs ml-1">
                    Create an account
                </span>
            </p>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel={"Sign in"}
            onClose={ loginModal.onClose }
            onSubmit={ onSubmit }
            body= { bodyContent }
            footer={footerContent}
        />
    );
}

export default LoginModal;