import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";


const Profile = props => {
    return (
        <div className="h-screen flex flex-col space-y-8 items-center justify-center ">
            {/*<BackgroundCircles/>*/}
            <img
                src="https://pbs.twimg.com/profile_images/1597156489071939584/Bwgpu_lH_400x400.jpg"
                alt=""
                className="relative rounded-full h-32 w-32 mx-auto object-cover"
            />

            <div className="z-20">
                <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
                    {props.user.profile.profession}
                </h2>
                <h1 className="text-5xl lg:text-6xl font-semibold px-10 uppercase">
                    {props.user.username}
                </h1>

                <div className="pt-5 flex items-start justify-between max-w-8xl mx-auto z-20 xl:items-center">
                    <Link to={`/about/${props.user.id}`}>
                        <button className="profileButton cursor-pointer hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                            About
                        </button>
                    </Link>
                    <Link to={`/experiences/${props.user.id}`} >
                        <button className="profileButton hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                            experiences
                        </button>
                    </Link>
                    <Link to={`/skills/${props.user.id}`} >
                        <button className="profileButton hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                            skills
                        </button>
                    </Link>
                    <Link to={`/projects/${props.user.id}`} >
                        <button className="profileButton hover:border-[#F7AB0A]/40 hover: text-[#F7AB0A]/40">
                            projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
Profile.propTypes = {
  profile: PropTypes.object,
    username: PropTypes.string,

}
export default Profile
