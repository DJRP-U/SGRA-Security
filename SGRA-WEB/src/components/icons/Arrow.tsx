
type Props = {
    isOpen: boolean
}

export default function Arrow( { isOpen } : Props ) {
    return (
        <svg
            className={`w-4 h-4 transition-transform duration-300 text-neutral-700 
                        invisible group-hover:visible
                        ${isOpen ? 'visible transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    );
}