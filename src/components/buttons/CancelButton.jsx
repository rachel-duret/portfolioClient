import React from 'react'

const CancelButton = ({setOpen}) => {
    return (
        <button type="submit"
                onClick={()=>setOpen(false)}
                className="text-red-500 bg-gray-200 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Cancel
        </button>
    )
}
CancelButton.propTypes = {}
export default CancelButton
