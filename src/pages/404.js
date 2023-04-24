import Link from 'next/link'
import React from 'react'

function index() {
  return (
    <section>
        <h1><span className='text-primary'>Oops!</span> The dev forgot to add this route.</h1>
        <Link href={'/'} passHref className='btn btn-secondary'>Sorry! Go Home</Link>
    </section>
  )
}

export default index