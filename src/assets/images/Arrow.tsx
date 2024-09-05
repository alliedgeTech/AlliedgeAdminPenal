import React from 'react'

export default function Arrow() {
  return (
    <div>
      <svg
          className={`absolute top-0 right-0 w-5 h-5 mt-3 mr-3 transition-transform $ 'transform rotate-180' `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
  )
}

      
