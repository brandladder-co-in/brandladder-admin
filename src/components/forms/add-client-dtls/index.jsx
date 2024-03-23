import React, { useState } from 'react';
import { useFirestore } from '../../../context/FirestoreContext';

const AddClientDtls = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [desc, setDesc] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyPhone, setCompanyPhone] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyCountry, setCompanyCountry] = useState('')
    const [startDate, setStartDate] = useState('')
    const [serviceDesc, setServiceDesc] = useState('')
    const [serviceList, setServiceList] = useState([])
    const [websiteLink, setWebsiteLink] = useState('')
    const [fb, setFb] = useState('')
    const [insta, setInsta] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')

    const { storeData: storeClientData } = useFirestore()

    const handleServiceListChange = (e) => {
        const inputValue = e.target.value;
        const servicesArray = inputValue.split(',').map(service => service.trim());
        setServiceList(servicesArray);
    };

    const handleStoreClientData = async () => {

        setIsLoading(true)
        try {

            const clientDtls = {
                companyDtls: {
                    company_name: name,
                    company_logo: logo,
                    compnay_desc: desc,
                    company_website: websiteLink,
                    company_location: companyAddress,
                    company_county: companyCountry,
                    company_email: companyEmail,
                    company_phone: companyPhone,
                    company_socials: {
                        facebook: fb,
                        insta: insta,
                        linkedin: linkedin,
                        twitter: twitter
                    },
                },
                serviceDtls: {
                    start_date: startDate,
                    end_date: null,
                    serviceRenewCount: 0,
                    service_list: serviceList,
                    service_desc: serviceDesc,
                },
                employeeId: null,
            }
            // console.log('client data: ', clientDtls)
            await storeClientData('clients', name, clientDtls)

            setName('');
            setLogo('');
            setDesc('');
            setCompanyEmail('');
            setCompanyPhone('');
            setCompanyAddress('');
            setCompanyCountry('');
            setStartDate('');
            setServiceDesc('');
            setServiceList([]);
            setWebsiteLink('');
            setFb('');
            setInsta('');
            setTwitter('');
            setLinkedin('');

        } catch (error) {
            console.error('Error while storing client data: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='space-y-10 pb-10'>
            <div className='space-y-10'>

                <section className='p-4 space-y-4'>
                    <h2 className='text-3xl font-semibold mb-2'>Client Details: </h2>

                    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <aside>
                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="company_name">
                                    Company Name
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="company_name"
                                    type="text"
                                    placeholder="Company/Client Name"
                                    name="company_name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    required
                                />
                            </div>
                        </aside>
                        <aside>
                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="company_logo">
                                    Company Logo URL
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="company_logo"
                                    type="text"
                                    placeholder="Logo URL"
                                    name="company_logo"
                                    value={logo}
                                    onChange={(e) => { setLogo(e.target.value) }}
                                    required
                                />
                            </div>
                        </aside>
                    </section>

                    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <aside>
                            <label className="block text-sm font-bold mb-2" htmlFor="company_email">
                                Company Email
                            </label>
                            <input
                                className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="company_email"
                                type="text"
                                placeholder="Company Email"
                                name="company_email"
                                value={companyEmail}
                                onChange={(e) => { setCompanyEmail(e.target.value) }}
                                required
                            />
                        </aside>

                        <aside>
                            <label className="block text-sm font-bold mb-2" htmlFor="company_phone">
                                Company Contact number
                            </label>
                            <input
                                className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="company_phone"
                                type="text"
                                placeholder="Company Contact No."
                                name="company_phone"
                                value={companyPhone}
                                onChange={(e) => { setCompanyPhone(e.target.value) }}
                                required
                            />
                        </aside>
                    </section>

                    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        <aside>
                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="about_company">
                                    About Company
                                </label>
                                <textarea
                                    className="textarea-ghost-secondary textarea shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="about_company"
                                    type="text"
                                    placeholder="About Company"
                                    name="about_company"
                                    value={desc}
                                    onChange={(e) => { setDesc(e.target.value) }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="website-link">
                                    Company Website URL
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="website-link"
                                    type="text"
                                    placeholder="Company/Client Website URL"
                                    name="website-link"
                                    value={websiteLink}
                                    onChange={(e) => { setWebsiteLink(e.target.value) }}
                                    required
                                />
                            </div>
                        </aside>

                        <aside className='grid grid-cols-1 gap-2'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className="block text-sm font-bold my-auto text-center col-span-1" htmlFor="facebook">
                                    Facebook
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline col-span-2 mx-auto my-auto"
                                    id="facebook"
                                    type="text"
                                    placeholder="Facebook Profile"
                                    name="Facebook"
                                    value={fb}
                                    onChange={(e) => { setFb(e.target.value) }}
                                    required
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label
                                    className="block text-sm font-bold my-auto text-center col-span-1"
                                    htmlFor="linkedin"
                                >
                                    Linkedin
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline col-span-2"
                                    id="linkedin"
                                    type="text"
                                    placeholder="Linkedin Profile"
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={(e) => { setLinkedin(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className="block text-sm font-bold my-auto text-center col-span-1"
                                    htmlFor="twitter">
                                    Twitter
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline col-span-2"
                                    id="twitter"
                                    type="text"
                                    placeholder="Twitter Profilee"
                                    name="twitter"
                                    value={twitter}
                                    onChange={(e) => { setTwitter(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className="block text-sm font-bold my-auto text-center col-span-1"
                                    htmlFor="insta">
                                    Instagram
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline col-span-2"
                                    id="insta"
                                    type="text"
                                    placeholder="Insta Profile"
                                    name="insta"
                                    value={insta}
                                    onChange={(e) => { setInsta(e.target.value) }}
                                    required
                                />
                            </div>
                        </aside>
                    </section>

                    <section className='grid grid-cols-1 md:grid-cols-3 gap-4' >
                        <aside className='col-span-2'>
                            <label className="block text-sm font-bold mb-2" htmlFor="website-link">
                                Company Address
                            </label>
                            <input
                                className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="website-link"
                                type="text"
                                placeholder="Company/Client Address"
                                name="website-link"
                                value={companyAddress}
                                onChange={(e) => { setCompanyAddress(e.target.value) }}
                                required
                            />
                        </aside>

                        <aside className='col-span-1'>
                            <label className="block text-sm font-bold mb-2">
                                County
                            </label>
                            <input
                                className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Company Center"
                                value={companyCountry}
                                onChange={(e) => { setCompanyCountry(e.target.value) }}
                                required
                            />
                        </aside>
                    </section>
                </section>

                <section className='p-4'>
                    <h2 className='text-3xl font-semibold mb-6'>Service Details: </h2>
                    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <aside className='h-full'>
                            <label className="block text-sm font-bold mb-2" htmlFor="serviceDesc">
                                Services Description
                            </label>
                            <textarea
                                className="textarea-ghost-secondary textarea shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-4/5"
                                id="serviceDesc"
                                type="text"
                                placeholder="Key points by Clients"
                                name="serviceDesc"
                                value={serviceDesc}
                                onChange={(e) => { setServiceDesc(e.target.value) }}
                                required
                            />
                        </aside>

                        <aside className='grid grid-cols-1 gap-2'>
                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="serviceeList">
                                    List Of Services
                                    <p className='text-red-600 text-xs'>
                                        Note: Seperate every service with comma( , )
                                    </p>
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="serviceeList"
                                    type="text"
                                    placeholder="List Of Services"
                                    name="serviceeList"
                                    value={serviceList}
                                    onChange={handleServiceListChange}
                                    required
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                <label className="block text-sm font-bold mx-auto my-auto col-span-1" htmlFor="start_date">
                                    Work Started From
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline col-span-2"
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }}
                                    required
                                />
                            </div>
                        </aside>

                    </section>
                </section>
            </div>

            {
                isLoading ? (
                    <button className="btn btn-outline-secondary w-full">
                        Loading ...
                    </button>
                ) : (
                    <button className="btn btn-outline-secondary w-full" onClick={handleStoreClientData}>
                        Submit
                    </button>
                )
            }

        </section>
    )
}

export default AddClientDtls
