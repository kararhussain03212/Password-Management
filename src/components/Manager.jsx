import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef(null);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [showPass, setShowPass] = useState(false);


    // Fetch all passwords from the backend (GET request)
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords();
    }, []);


    const copyText = (text) => {
        toast('Copy to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    // Toggles between showing and hiding password
    const showPassword = () => {
        setShowPass(!showPass);
        if (ref.current.src.includes("/icons/eye-close.svg")) {
            ref.current.src = "/icons/eye-open.svg"
        }
        else {
            ref.current.src = "/icons/eye-close.svg"
        }
    }


    // Saves a password entry (POST + DELETE if editing)
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            const newPassword = { ...form, id: uuidv4() };

            // Delete previous entry if editing (optional)
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id: form.id })
            })

            // Save new password to backend (POST request)
            setPasswordArray([...passwordArray, newPassword]);
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            // Reset form field
            setForm({ site: "", username: "", password: "" })

            toast('Password Saved Succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error Password not saved');
        }
    }

    // Edits a password by moving its data back into the input fields
    const editPassword = (id) => {
        console.log("Deleting password with id ", id)
        setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    // Deletes a password both from UI and backend
    const deletePassword = async (id) => {
        let c = confirm("Do your really want to delete this information?")
        if (c) {
            console.log("Deleting password with id ", id)
            setPasswordArray(passwordArray.filter(item => item.id !== id))

            // Delete from backend
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id })
            })

            toast('Password Deleted succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    // Handles input change for controlled components
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ">
                <div className="p-2 mycontainer md:p-0 min-h-[80.5vh]">
                    <h1 className='text-4xl font-bold text-center pt-10'>
                        <span className='text-5xl text-[#C53678]'>&lt;</span>
                        Pass
                        <span className='text-5xl text-[#C53678] '>MGT/&gt;</span>
                    </h1>
                    <p className='text-black text-lg text-center'>your own Password Manager</p>

                    <div className='flex flex-col p-4 gap-8 items-center m-auto'>
                        <input
                            value={form.site}
                            onChange={handleChange}
                            className='rounded-full bg-white border border-black w-full p-4 py-1'
                            placeholder='Enter website URL'
                            type="text"
                            name='site'
                            id='site'
                        />
                        <div className='flex flex-col md:flex-row w-full gap-8 justify-between'>
                            <input
                                value={form.username}
                                onChange={handleChange}
                                className='rounded-full bg-white w-full border border-black p-4 py-1'
                                placeholder='Enter Username'
                                type="text"
                                name='username'
                                id='username'
                            />
                            <div className="relative w-full">
                                <input
                                    value={form.password}
                                    onChange={handleChange}
                                    className='rounded-full bg-white border w-full border-black  p-4 py-1'
                                    placeholder='Enter Password'
                                    type={showPass ? "text" : "password"}
                                    name='password'
                                    id='password'
                                />
                                <span className='absolute right-[5px] top-[5px]' onClick={showPassword}>
                                    <img src="/icons/eye-open.svg" ref={ref} alt="eye" className="w-5 h-6 cursor-pointer" />
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={savePassword}
                            className='flex justify-center items-center bg-[#C53678] transition-all duration-300 hover:bg-[#c70560] rounded-full px-10 py-3 border-l-black border-r-black w-fit gap-2 border-2 text-white'
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                                colors="primary:white,secondary:#C53678">
                            </lord-icon>
                            Save Password
                        </button>
                    </div>

                    <div className="passwords pb-10">
                        <h2 className='font-bold text-2xl py-4'>Your Passowrds</h2>
                        {passwordArray.length === 0 && <div>No Data to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">

                            <thead className=' bg-[#C53678] text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#fa007556]'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center w-32 py-2 border border-white '>
                                            <div className='flex items-center justify-center'>
                                                <a className='' href={item.site} target='_blank'>{item.site}
                                                </a>
                                                <img className='iconcopy w-5 ml-2 cursor-pointer' src="icons/copy.svg" alt="copy"
                                                    onClick={() => { copyText(item.site) }} />
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                {item.username}
                                                <img className='iconcopy w-5 ml-2 cursor-pointer ' src="icons/copy.svg" alt="copy" onClick={() => { copyText(item.username) }} />
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                {'*'.repeat(item.password.length)}
                                                <img className='iconcopy w-5 ml-2 cursor-pointer' src="icons/copy.svg" alt="copy" onClick={() => { copyText(item.password) }} />
                                            </div>
                                        </td>
                                        <td className='w-10 py-2 border border-white'>
                                            <div className='flex justify-evenly'>
                                                <span onClick={() => { editPassword(item.id) }}>
                                                    <img className='cursor-pointer w-5' src="icons/edit.svg" alt="edit" />
                                                </span>
                                                <span onClick={() => { deletePassword(item.id) }}>
                                                    <img className='cursor-pointer w-5' src="icons/delete.svg" alt="delete" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Manager