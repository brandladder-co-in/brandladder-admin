import React, { useEffect } from 'react';

const AuthPageFrames = ({ children }) => {

    useEffect(() => {
        document.title = 'BrandLadder | Admin';

    }, []);

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="Pattern"
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">

                        <h1 className="mt-6 text-gray-900">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, neque asperiores perferendis repudiandae repellat saepe! Reprehenderit, eaque accusamus. Nostrum perferendis odit voluptatem repellendus tenetur quam voluptates doloribus accusantium earum qui.
                        </h1>
                        {children}
                    </div>
                </main>
            </div>
        </section>
    )
}

export default AuthPageFrames
