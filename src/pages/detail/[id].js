import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Moeys from "../../images/moeys.png";

function ReadMore({ children }) {
    const text = children;
    const [showFullText, setShowFullText] = useState(false);

    if (text.length <= 499) {
        return <p>{text}</p>;
    }

    const truncatedText = showFullText ? text : `${text.slice(0, 300)}`;
    const toggleShowFullText = () => setShowFullText((show) => !show);
    return (
        <>
            <p>
                {truncatedText}
                <button
                    className="font-bold font-kh text-red-500"
                    onClick={toggleShowFullText}
                >
                    {showFullText ? "...Read Less" : "...Read More"}
                </button>
            </p>
        </>
    );
}

export default function detail() {

    let api = "http://localhost:8000/api";
    const router = useRouter();
    const { id } = router.query;

    const [university, setUniversity] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function fetchUniversity(id) {
        fetch(api+'/universities/'+id, {})
            .then(res => res.json())
            .then(res => {
                setUniversity(res.data);
                setIsLoading(false);
                console.log(1);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (router.isReady) {
            fetchUniversity(id);
        }
    }, [router.isReady]);

    if (isLoading) return (
        <div className="dark:text-gray-50">Loading....</div>
    )

    return (
        <main className="content">
            {/* banner */}
            <section>
                <div className="flex py-2 px-2 gap-1 ">
                    <div className="flex justify-center w-1/2 h-80">
                        <img className="object-contain rounded-md" src={api+"/images/"+university.images} alt="banner" />
                    </div>
                    <div className="relative w-1/2 h-80 bg-gray-600 rounded-md">

                        <div className="w-14 absolute top-2 right-4">
                            <Image
                                className="object-contain"
                                src={Moeys}
                                alt="Moeys"
                            />
                        </div>
                        <div className="w-1/2 text-white font-kh text-banner flex flex-col text-center absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 ">
                            <img
                                className="w-1/2 m-auto"
                                src={api+"/images/"+university.logo}
                                alt="logouniversity"
                            />
                            <span className="tracking-wide dark:text-gray-50">
                                    {university.name_km}
                                </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ព័ត៍មានទូទៅ */}
            <div className="py-4 px-5">
                <h1 className="font-kh font-bold text-xl border-y-2 text-center py-2 px-2 dark:text-gray-50">
                    ព័ត៍មានទូទៅ
                </h1>
                <div className="h-fit py-5  ">
              <span className="font-khBtB text-paragraph py-4 -tracking-wide dark:text-gray-50">
                <div>
                    {university.about_km}
                </div>
              </span>
                </div>
            </div>
            {/* body */}
            <div className="flex flex-col h-fit gap-2 ">
                {/* contact */}
                <div className="h-fit mt-5 font-kh rounded bg-footer pb-5 ">
                    <h1 className="text-center text-2xl font-bold py-2 border-b-2 dark:text-gray-50">
                        ទំនាក់ទំនង
                    </h1>

                    <div className=" flex flex-row flex-wrap justify-evenly py-5 gap-2 md:justify-around">
                        {/* number phone */}
                        <div className="md:flex-col">
                            <div className="flex items-center justify-center gap-2 pb-2">
                                <svg
                                    className="h-8 w-8 dark:text-gray-50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                    ></path>
                                </svg>
                                <span className="text-center font-bold dark:text-gray-50">លេខទូរស័ព្ច</span>
                            </div>
                            <div className="flex flex-col divide-y divide-slate-500">
                                <span className="p-2 text-center dark:text-gray-50">{university.phone}</span>
                            </div>
                        </div>

                        {/* email */}
                        <div className="md:flex-col">
                            <div className="flex items-center justify-center pb-2 gap-2">
                                <svg
                                    className="h-8 w-8 dark:text-gray-50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    ></path>
                                </svg>
                                <span className="text-center font-bold dark:text-gray-50">អ៊ីមែល</span>
                            </div>
                            <div className="flex flex-col divide-y divide-slate-500">
                                <span className="p-2 text-center dark:text-gray-50">{university.email}</span>
                            </div>
                        </div>

                        {/* website */}
                        <div className="md:flex-col">
                            <div className="flex items-center justify-center gap-2 pb-2">
                                <svg
                                    className="h-8 w-8 dark:text-gray-50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                    ></path>
                                </svg>
                                <span className="text-center font-bold dark:text-gray-50">វេបសាយ</span>
                            </div>
                            <div className="flex flex-col divide-y divide-slate-500">
                                <span className="p-2 text-center dark:text-gray-50">{university.website}</span>
                            </div>
                        </div>

                        {/* location */}
                        <div className="md:flex-col">
                            <div className="flex items-center pb-2 gap-2 justify-center">
                                <svg
                                    className="h-8 w-8 dark:text-gray-50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                                    ></path>
                                </svg>
                                <span className="text-center font-bold dark:text-gray-50">ទីតាំង</span>
                            </div>
                            <div className="flex flex-col flex-wrap divide-y divide-slate-500 ">
                                <span className="p-2  text-center dark:text-gray-50">{university.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}