import React from 'react';
const AppLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* Background Layers */}
            <div className="w-full absolute top-[30%] bg-pink-200 opacity-20 left-0 h-[500px] -skew-y-24 z-0" />
            <div className="w-full absolute top-[20%] bg-purple-200 opacity-20 left-0 h-[500px] -skew-y-12 z-0" />

            {/* Content goes on top */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default AppLayout;

