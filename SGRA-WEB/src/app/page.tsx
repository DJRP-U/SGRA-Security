import Link from "next/link";
import NextImage from "next/image";
import HeaderPage from "@/components/layouts/header/HeaderPage";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black font-sans">
            <HeaderPage />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden border-b border-gray-200">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-6xl md:text-7xl mb-6">
                                Gestiona tus proyectos <br />
                                <span className="text-gray-600">Fácilmente</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Optimiza tu flujo de trabajo y alcanza tus objetivos.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
                                <Link
                                    href="/login"
                                    className="px-10 py-4 text-lg font-medium rounded-none text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href="/auth/request-register"
                                    className="px-10 py-4 text-lg font-medium rounded-none text-black bg-white border border-black hover:bg-gray-50 transition-all duration-300"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section (Moved Up) */}
                <section className="py-24 bg-white border-b border-gray-200">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-black mb-4">Características Principales</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Herramientas esenciales en el sistema</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-black transition-colors duration-300">
                                <div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-3">Requisito ágiles</h3>
                                <p className="text-gray-600">Crea, organiza y prioriza requisitos sin perder trazabilidad.</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-black transition-colors duration-300">
                                <div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-3">Metodología Scrum</h3>
                                <p className="text-gray-600">Gestiona historias de usuario, sprints y backlog.</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex flex-col items-center text-center p-8 border border-gray-100 hover:border-black transition-colors duration-300">
                                <div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-3">Roles</h3>
                                <p className="text-gray-600">Define y asigna roles en cada proyecto.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Us Section (Moved Down) */}
                <section className="py-24 bg-gray-50">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold text-black mb-6">Acerca de Nosotros</h2>
                                <div className="w-16 h-1 bg-black mb-8"></div>
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    En SGRA, creemos que la gestión de proyectos no debería ser un obstáculo, sino un catalizador para el éxito. Nuestra misión es proporcionar una plataforma intuitiva y potente que elimine el ruido y permita a los equipos enfocarse en lo que realmente importa.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    Nacimos de la necesidad de una herramienta que combinara funcionalidad robusta con un diseño limpio y minimalista. Nos apasiona el software bien hecho y la eficiencia operativa.
                                </p>
                                {/* Added Contact Button */}
                                <div>
                                    <Link
                                        href="/auth/contact-us"
                                        className="inline-block px-8 py-3 text-lg font-medium rounded-none text-black bg-transparent border border-black hover:bg-black hover:text-white transition-all duration-300"
                                    >
                                        Contáctanos
                                    </Link>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                {/* Image Replacement */}
                                <div className="w-full max-w-md flex items-center justify-center">
                                    <NextImage
                                        src="/logo-carrera.jpg"
                                        alt="Logo Carrera de Ingeniería en Sistemas / Computación"
                                        width={500}
                                        height={500}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-black text-white py-12">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <span className="text-2xl font-bold tracking-wider">SGRA</span>
                            <p className="text-gray-400 text-sm mt-2">
                                &copy; {new Date().getFullYear()} Todos los derechos reservados.
                            </p>
                        </div>
                        <div className="flex space-x-8">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">GitHub</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
