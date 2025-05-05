import React from 'react'

const Hobby =( {hobbies}) => {
    return (
      <>
          <div className="flex flex-row justify-between flex-wrap">
              {
                  hobbies.map((hobby) => (
                      <div className="space-x-10">
                          <h6 className="text-sm text-center font-semibold uppercase">
                              {hobby.name}
                          </h6>
                          <img
                              src={hobby.imageUrl}
                              className="mb-20 md:mb-0 flex-shrink-0 w-10 h-10 rounded-full object-cover md:rounded-lg md:w-50 md:h-50"
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
