import React from "react";

const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to Glamour Salon ✨
                    </h1>
                    <p className="text-lg mb-6">
                        Where beauty meets perfection. Book your appointment today and let
                        our experts pamper you!
                    </p>
                    <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition">
                        Book Now
                    </button>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src="https://5.imimg.com/data5/SELLER/Default/2023/4/301029108/OD/CW/ZN/5050159/saloon-interior-design-500x500.jpg"
                        alt="Salon"
                        className="rounded-lg shadow-xl w-full"
                    />
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6 md:px-20">
                <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        {
                            title: "Hair Styling",
                            desc: "Trendy cuts, blowouts, and color treatments.",
                            img: "https://t3.ftcdn.net/jpg/01/45/45/68/360_F_145456840_FR304Elzr4TMOy3uJnlKGkPhFdQNPRrU.jpg",
                        },
                        {
                            title: "Facials & Skin Care",
                            desc: "Glowing skin with our rejuvenating treatments.",
                            img: "https://media.istockphoto.com/id/1399469980/photo/close-up-portrait-of-anorganic-facial-mask-application-at-spa-salon-facial-treatment-skin.jpg?s=612x612&w=0&k=20&c=ZvZi_bdGLicsykUtlrHgQe70ftZzd_xPKvq2vzfOyV0=",
                        },
                        {
                            title: "Manicure & Pedicure",
                            desc: "Relax and refresh your hands & feet.",
                            img: "https://i.pinimg.com/736x/76/10/9a/76109a917c876ff68a20479c395413be.jpg",
                        },
                    ].map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
                        >
                            <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section className="bg-gray-50 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <img
                        src="https://content.jdmagicbox.com/v2/comp/delhi/a9/011pxx11.xx11.240117120849.q5a9/catalogue/glamour-salon-aesthetic-greater-kailash-delhi-beauty-parlours-rpwnp099q9.jpg"
                        alt="About Us"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">About Glamour Salon</h2>
                    <p className="text-gray-600 mb-4">
                        We are a team of passionate beauty experts dedicated to enhancing
                        your natural beauty. From the latest hairstyles to relaxing spa
                        treatments, we provide a complete experience tailored to you.
                    </p>
                    <button className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6 md:px-20 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        {
                            name: "Priya Sharma",
                            review:
                                "The best salon experience I've ever had! The staff is so friendly and talented.",
                        },
                        {
                            name: "Ananya Verma",
                            review:
                                "Absolutely loved my new hairstyle. Will definitely come back!",
                        },
                        {
                            name: "Riya Kapoor",
                            review:
                                "Their facials are heavenly! My skin feels fresh and glowing.",
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-pink-50 p-6 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <p className="italic text-gray-700">"{testimonial.review}"</p>
                            <h4 className="mt-4 font-semibold text-pink-600">
                                - {testimonial.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <footer className="bg-pink-500 text-white py-10 text-center">
                <h3 className="text-2xl font-bold mb-4">
                    Ready to Look Your Best? 💇‍♀️
                </h3>
                <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
                    Book Appointment
                </button>
            </footer>
        </div>
    );
};

export default Home;