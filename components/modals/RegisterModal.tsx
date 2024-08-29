"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Input from "../Input";
import Modal from "../Modal";
import useUsers from "@/hooks/useUsers";

interface User {
    id: string;
    name: string;
    username?: string;
    email?: string;
    bio?: string;
    profileImage?: string;
    coverImage?: string;
    emailVerified?: string;
    image?: string;
    hashedPassword: string;
    createdAt: string;
    updatedAt: string;
    followingIds: string[];
    hasNotifications?: boolean;
}

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordCheck, setShowPasswordCheck] = useState(false)

    const [usernames, setUsernames] = useState<string[]>([]);
    const [usedEmails, setUsedEmails] = useState<string[]>([]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isValidPassword = (password: string) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[@$!%*?&#.]/.test(password);
    }

    const { data: users = []} = useUsers();

    useEffect(() => {
        const usernamesList = users.map((item: User) => item.username).filter(Boolean) as string[];
        const usedEmailsList = users.map((item: User) => item.email).filter(Boolean) as string[];
        setUsernames(usernamesList);
        setUsedEmails(usedEmailsList);
    }, [users]);

    console.log(usernames)

    const onToggle = useCallback(() => {
        if (isLoading) 
            return;

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordCheckVisibility = () => {
        setShowPasswordCheck(!showPasswordCheck);
    };

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            if(usernames.includes(username)){
                toast.error('Username not available.');
                return null
            }

            if(usedEmails.includes(email)){
                toast.error('Email already registered.');
                return null
            }

            if(name == '' || username == '' || email == '' || password == ''){
                toast.error('Bad credentials');
                return null
            }

            if(password != passwordCheck){
                toast.error('Passwords do not match.');
                return null
            }

            if (!isValidEmail(email)) {
                toast.error('Invalid email format.');
                return null;
            }

            if (!isValidPassword(password)) {
                toast.error('Password format is incorrect.');
                return null;
            }

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            toast.success('Account created.');

            signIn('credentials', {
                email,
                password
            })

            registerModal.onClose();
            
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, name, passwordCheck]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Name" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username}
                disabled={isLoading}
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
            <span className="text-neutral-500 text-xs ml-1">Confirm Password</span>
            <div className="flex flex-row justify-center items-center">
                <Input 
                    placeholder="Confirm Password" 
                    type={showPasswordCheck ? 'text' : 'password'}
                    onChange={(e) => setPasswordCheck(e.target.value)} 
                    value={passwordCheck}
                    disabled={isLoading}
                />
                <button 
                    type="button" 
                    onClick={togglePasswordCheckVisibility}
                    className="text-purple-800 mt-1 absolute right-8"
                >
                    {showPasswordCheck ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}
                </button>
            </div>
            
            <span className="text-neutral-500 text-xs ml-1 flex flex-row justify-center">Password: 8+ chars, upper, lower, number, special.</span>
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="text-xs"> Already have an account? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline text-xs ml-1">
                    Sign in
                </span>
            </p>
        </div>
    );

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;
