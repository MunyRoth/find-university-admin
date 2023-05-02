import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function addUniversity() {

    let api = "http://localhost:8000/api";
    const router = useRouter();

    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState(1);

    const [universityTypes, setUniversityTypes] = useState([]);
    const [universityType, setUniversityType] = useState();

    const [logo, setLogo] = useState()
    const [logoURLS, setLogoURLS] = useState("")
    const [isLogo, setIsLogo] = useState(false);

    const [images, setImages] = useState()
    const [imageURLS, setImageURLS] = useState("")
    const [isImages, setIsImages] = useState(false);

    // Get provinces from api
    function fetchProvinces() {
        fetch(api+'/provinces', {

        })
            .then(res => res.json())
            .then(res => {
                setProvinces(res.data);
            })
            .catch(err => console.log(err));
    }

    // Get university types from api
    function fetchUniversityTypes() {
        fetch(api+'/university_types', {

        })
            .then(res => res.json())
            .then(res => {
                setUniversityTypes(res.data);
            })
            .catch(err => console.log(err));
    }

    // Set logo when input image (logo) is changed
    const inputLogo = e => {
        if (e.target.files && e.target.files[0]) {
            setLogo(event.target.files[0]);
            setLogoURLS(URL.createObjectURL(event.target.files[0]));
            setIsLogo(true);
        }
    }

    // Set logo when input image (logo) is changed
    const inputImages = e => {
        if (e.target.files && e.target.files[0]) {
            setImages(event.target.files[0]);
            setImageURLS(URL.createObjectURL(event.target.files[0]));
            setIsImages(true);
        }
    }

    const addUniversity = e => {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault();

        // Get data from the form.
        const data = new FormData();
        data.append('university_type_id', event.target.university_type_id.value);
        data.append('name_km', event.target.name_km.value);
        data.append('name_en', event.target.name_en.value);
        data.append('about_km', event.target.about_km.value);
        data.append('about_en', event.target.about_en.value);
        data.append('logo', logo);
        data.append('website', event.target.website.value);
        data.append('email', event.target.email.value);
        data.append('phone', event.target.phone.value);
        data.append('images', images);


        const d ={
            'university_type_id': event.target.university_type_id.value,
            'name_km': event.target.name_km.value,
            'name_en': event.target.name_en.value,
            'about_km': event.target.about_km.value,
            'about_en': event.target.about_en.value,
            'website': event.target.website.value,
            'email': event.target.email.value,
            'phone': event.target.phone.value,
        }

        console.log(d);
        // Send data to the server.
        fetch(api+'/universities', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: data,
        })
            .then(res => res.json())
            .then(res => {
                // fetch(api+'/university_branches', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         university_id: res.data.id,
                //         province_id: event.target.province_id.value,
                //         address_km: event.target.address_km.value,
                //         address_en: event.target.address_en.value,
                //     })
                // })
                //     .then(res => res.json())
                //     .then(res => {
                //         console.log(res);
                //         router.push("/")
                //             .then(r => console.log('success', r));
                //     })
                //     .catch(err => console.log('error', err));
            })
            .catch(err => console.log('error', err));
    }

    useEffect(() => {
        fetchProvinces();
        fetchUniversityTypes();
    }, []);

    return (

        <main className="container">
            <h1 className="text-2xl font-bold m-7 dark:text-gray-50">បន្ថែមសកលវិទ្យាល័យ</h1>
            <h2 className="text-xl font-bold mb-2 dark:text-gray-50">ព័ត៌មានសាកលវិទ្យាល័យ</h2>
            <form
                method="post"
                encType="multipart/form-data"
                onSubmit={addUniversity}
            >

                {/*-------------------------- Logo --------------------------*/}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
                        រូបសញ្ញាសកលវិទ្យាល័យ *
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-full h-64">
                            <label htmlFor="logo"
                                   className="flex items-center justify-center w-full h-full">
                                {isLogo ? (
                                    <img src={logoURLS} alt="Logo" className="h-full rounded-lg"/>
                                ) : (
                                    <div

                                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                                            drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                            800x400px)</p>
                                    </div>
                                )}
                                <input onChange={inputLogo} id="logo" name="logo" type="file" className="hidden" accept=".png, .jpg, .jpeg" />
                            </label>
                        </div>
                    </div>
                </div>

                {/*-------------------------- Name --------------------------*/}
                <div className="mb-6">
                    <label htmlFor="name_km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ឈ្មោះសកលវិទ្យាល័យ *
                    </label>
                    <input type="text" id="name_km" name="name_km"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="name_en" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        University Name
                    </label>
                    <input type="text" id="name_en" name="name_en"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                {/*Type*/}
                <div className="mb-6">
                    <label htmlFor="types" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ប្រភេទ *
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="types"
                        name="university_type_id"
                        aria-label="types"
                        value={universityType}
                        onChange={e => setUniversityType(e.target.value)}

                    >
                        <option selected disabled hidden>ជ្រើសរើសប្រភេទ</option>
                        {universityTypes.map(universityType => {
                            return <option key={universityType.id} value={universityType.id}>{universityType.type_km}</option>
                        })}
                    </select>
                </div>

                {/*About*/}
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        អំពី *
                    </label>
                    <textarea id="about_km" rows="4" name="about_km"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        About
                    </label>
                    <textarea id="about_en" rows="4" name="about_en"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                {/*Images*/}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
                        រូបភាពបន្ថែម
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-full h-64">
                            <label htmlFor="images"
                                   className="flex items-center justify-center w-full h-full">
                                {isImages ? (
                                    <img src={imageURLS} alt="Logo" className="h-full rounded-lg"/>
                                ) : (
                                    <div

                                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                                            drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                            800x400px)</p>
                                    </div>
                                )}
                                <input onChange={inputImages} id="images" name="images" type="file" className="hidden" accept=".png, .jpg, .jpeg" />
                            </label>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-2 dark:text-gray-50">ទំនាក់ទំនង</h2>
                <div className="mb-6">
                    <label htmlFor="provinces" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        រាជធានី/ខេត្ត
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="provinces"
                        name="province_id"
                        aria-label="provinces"
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                    >
                        {provinces.map(province => {
                            return <option key={province.id} value={province.id}>{province.province_name_km}</option>
                        })}
                    </select>
                </div>

                {/*Address*/}
                <div className="mb-6">
                    <label htmlFor="address_km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        អាសយដ្ឋាន
                    </label>
                    <input type="text" id="address_km" name="address_km"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="address_en" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                    </label>
                    <input type="text" id="address_en" name="address_en"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                {/*Phone number*/}
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        លេខទូរស័ព្ទ
                    </label>
                    <input type="text" id="phone" name="phone"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>

                {/*Email*/}
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        អ៊ីម៉ែល
                    </label>
                    <input type="text" id="email" name="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>

                {/*Website*/}
                <div className="mb-6">
                    <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        គេហទំព័រ
                    </label>
                    <input type="text" id="website" name="website"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    />
                </div>

                <div className="mb-6">
                    <button type="button"
                            className="mr-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:bg-gray-400 font-medium rounded-lg text-sm w-full sm:w-auto mb-2 px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            onClick={() => {
                                router.push("/")
                                    .then(r => console.log('success', r));
                            }
                            }
                    >
                        ថយក្រោយ
                    </button>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        រក្សាទុក
                    </button>
                </div>
            </form>
        </main>
    )
}