import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [cookies, setCookie] = useCookies();
    // console.log(cookies)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

            if (!name || !email || !password) {
                toast.error("All FEILDS are compulsory")
                return
            }

            if (password.length < 8) {
                toast.error("Password should be atleast of 8 characters")
                return
            }

            const res = await axios.post(`${process.env.REACT_APP_API}/v1/u/createUser`, {
                name,
                email,
                password
            })


            if(res.data.success){
                
                setCookie('token',res.data.token)
                navigate('/')
                toast.success("Logged In")
                
            }
            else{
                toast.error("please enter valid credentials")
            }
      
    }


    return (
        <div className='flex flex-col justify-center items-center h-[100vh] w-full bg-[hsl(217, 12%, 63%)] text-[#bbbabf]'>

            <div className='w-[40%] h-[70%] ' style={{ backgroundColor: 'rgb(87, 155, 177)', borderRadius:'5%' }}>
                <h1 className='text-center text-[3rem] font-bold my-6 text-[rgb(248, 244, 234)]'>
                    Sign Up
                </h1>
                <form onSubmit={handleSubmit} className='mt-[10%] p-[5%]'>

                    <div className='flex flex-col gap-3 '>

                        <div className='flex gap-3 text-[18px]' >
                            <label className='w-[100px] text-[rgb(225, 215, 198)]' htmlFor="name">
                                Name:
                            </label>
                            <input className='w-full text-[rgb(248, 244, 234)] py-1 px-2 ' onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" />
                        </div>

                        <div className='flex gap-3 mt-[5%]'>
                            <label className='w-[100px] text-[rgb(248, 244, 234)] ' htmlFor="email">
                                Email:
                            </label>
                            <input className='w-full text-[#2c2a2b] py-1 px-2' onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                        </div>

                        <div className='flex gap-3 mt-[5%]'>
                            <label className='w-[100px] text-[rgb(248, 244, 234)]' htmlFor="password">
                                password:
                            </label>
                            <input className='w-full text-[#2c2a2b] py-1 px-2' onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />
                        </div>

                    </div>

                    <button className='mt-5 block w-fit mx-auto px-3 py-2 rounded-xl font-bold text-white bg-[#fd77a1]'>
                        submit
                    </button>
                </form>
            </div>

            <div className='flex gap-3 text-[18px] mt-10'>
                <h4 className='font-bold'>
                    Already have an account?
                </h4>
                <Link className='text-[#fd77a1]' to={'/login'}>Login</Link> here
            </div>
        </div>
    )
}

export default SignUp