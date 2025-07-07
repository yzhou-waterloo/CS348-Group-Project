'use client'

import React from 'react'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className=" flex flex-row w-auto p-10 mb-4 justify-center bg-gray-200 font-[family-name:var(--font-geist-sans)]">
            <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/get">Get</Link>
            <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/delete">Delete</Link>
            <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/insert">Insert</Link>
        </div>
    );
}
  