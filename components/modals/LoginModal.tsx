"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const onToggle = useCallback(()=> {
        if(isLoading) return;

        RegisterModal.onOpen();
        loginModal.onClose();
    },[isLoading, RegisterModal, loginModal])

    const onSubmit = useCallback(async ()=> {
        try{
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            })

            loginModal.onClose();
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    },[loginModal, email, password])

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
            <Input 
                placeholder="Password" 
                type="password"
                onChange={(e)=> setPassword(e.target.value)} 
                value={ password }
                disabled={ isLoading }
            />
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