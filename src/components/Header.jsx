import React, {useEffect} from 'react'
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


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
        <header className="sticky top-0 p-5 flex items-start justify-between max-w-8xl mx-auto z-20 xl:items-center border-slate-500 bg-slate-500">
            {/*{*/}
            {/*    user.socials.map((social)=>(*/}
            {/*            <div className="text-center">*/}
            {/*                <Link to={social.url}>{social.name}</Link>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    )*/}
            {/*}*/}
            <div className="text-center profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                <Link to="/">Home</Link>
            </div>
            <div className="text-center profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                <Link to={`/about/${user.id}`}>about{user.username}</Link>
            </div>
            <div className="text-center profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                <Link to={`/skills/${user.id}`}>Skills</Link>
            </div>
            <div className="text-center profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                <Link to={`/experiences/${user.id}`}>Experiences</Link>
            </div>
            <div className="text-center profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                <Link to={`/projects/${user.id}`}>projects</Link>
            </div>

        </header>
    )
}
Header.propTypes = {}
export default Header
