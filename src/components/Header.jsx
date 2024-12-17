import React, {useEffect} from 'react'
import {useState} from "react";
import PropTypes from 'prop-types'
import {SocialIcon} from "react-social-icons";
import {motion} from 'framer-motion'
import axios from "axios";


function Header(){
    let id = 1// TODO
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    const fetchUser = async () => {
    try {
      const res=await axios.get(`http://localhost:8080/users/${id}`)
            setUser(res.data);


    }catch (error) {
        setError(error.message);
    }finally{
        setLoading(false);
    }
}
    fetchUser()
    },[])
    if (loading)return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <header className="sticky top-0 p-5 flex items-start justify-between max-w-8xl mx-auto z-20 xl:items-center">
            {
                user.socials.map(social=>{
                    return (
                        <div className="text-center">
                            <a href={social.url}>{social.name}</a>
                        </div>
                    )
                })
            }

        </header>
    )
}
Header.propTypes = {}
export default Header
