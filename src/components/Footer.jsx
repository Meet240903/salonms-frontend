import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="p-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} SalonMS</footer>
        </div>
    )
}

export default Footer