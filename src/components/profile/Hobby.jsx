import React from 'react'
import PropTypes from 'prop-types'

const Hobby =( {hobbies}) => {
    return (
      <>
          <div className="flex flex-row justify-evenly">
              {
                  hobbies.map((hobby) => (
                      <div>
                          <h4 className="text-2sxl text-center font-semibold uppercase">
                              {hobby.name}
                          </h4>
                          <img
                              src={hobby.imageUrl}
                              className="mb-20 md:mb-0 flex-shrink-0 w-30 h-30 rounded-full object-cover md:rounded-lg md:w-50 md:h-50"
                           alt={hobby.name}/>
                      </div>
                  ))

              }
          </div>
      </>
    )
}
Hobby.propTypes = {}
export default Hobby
