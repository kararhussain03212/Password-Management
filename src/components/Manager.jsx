import React, { useState, useRef } from 'react';

const Manager = () => {
    const ref = useRef(null);
    const [form, setForm] = useState({site:"", username:"", password:""});
    const [showPass, setShowPass] = useState(false);
    
    const showPassword = () => {
        setShowPass(!showPass);
        if(ref.current.src.includes("/icons/eye-close.svg")){
            ref.current.src = "/icons/eye-open.svg"
        }
        else{
            ref.current.src = "/icons/eye-close.svg"
        }
    }
    
    const savePassword = () => {
        alert("Password Saved Successfully");
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#8bca84,transparent)]"></div>
            </div>

            <div className="mx-auto mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-4xl text-green-500'>&lt;</span>
                    Passop
                    <span className='text-4xl text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>your own Password Manager</p>

                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input 
                        value={form.site} 
                        onChange={handleChange} 
                        className='rounded-full bg-white border border-green-400 w-full p-4 py-1' 
                        placeholder='Enter website URL' 
                        type="text" 
                        name='site' 
                    />
                    <div className='flex gap-8 w-full justify-between'>
                        <input 
                            value={form.username} 
                            onChange={handleChange} 
                            className='rounded-full bg-white border border-green-400 w-full p-4 py-1' 
                            placeholder='Enter Username' 
                            type="text" 
                            name='username' 
                        />
                        <div className="relative">
                            <input 
                                value={form.password} 
                                onChange={handleChange} 
                                className='rounded-full bg-white border border-green-400 w-full p-4 py-1' 
                                placeholder='Enter Password' 
                                type={showPass ? "text" : "password"} 
                                name='password' 
                            />
                            <span className='absolute right-[5px] top-[5px]' onClick={showPassword}>
                                <img src="/icons/eye-open.svg" ref={ref} alt="eye" className="w-5 h-6 cursor-pointer" />
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={savePassword} 
                        className='flex justify-center items-center bg-green-400 transition-all duration-300 hover:bg-green-300 rounded-full px-10 py-2 w-fit gap-2 border-2'
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
            </div>
        </>
    )
}

export default Manager