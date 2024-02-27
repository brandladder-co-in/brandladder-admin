import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../../context/FirestoreContext';
import DashBoard from '../../../components/frames/dashboard';

const AddEvent = () => {

    const [eventTitle, setEventTitle] = useState('');
    const [img, setImg] = useState('');
    const [orgImg, setOrgImg] = useState('');
    const [orgName, setOrgName] = useState('');
    const [eventType, setEventType] = useState('Online');
    const [desc, setDesc] = useState('');
    const [bannerImg, setBannerImg] = useState('');
    const [regFees, setRegFees] = useState('Free');
    const [eligibility, setEligibility] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [teamSize, setTeamSize] = useState([{
        min: 1,
        max: 1,
        note: '',
    }]);
    const [timeline, setTimeline] = useState([
        {
            reg_start: '',
            reg_end: '',
            event_start: '',
            event_end: '',
            event_result: '',
            note: ''
        }
    ]);
    // const [prizes, setPrizes] = useState([
    //     {
    //         first: '',
    //         second: '',
    //         third: '',
    //         forth: '',
    //         fifth: '',
    //         other: '',
    //         note: ''
    //     }
    // ]);

    const { storeData: uploadEventData } = useFirestore()
    const navigate = useNavigate()

    const handleSubmit = () => {

        try {

            if (eventTitle !== '' && img !== '' && bannerImg !== '' && desc !== '' && eventType !== '' && orgImg !== '' && orgName !== '') {
                const eventData = {
                    eventTitle: eventTitle,
                    eventImage: img,
                    bannerImg: bannerImg,
                    eventDesc: desc,
                    hashtags: hashtags,
                    eventType: eventType,
                    eventTimeline: timeline,
                    teamSize: teamSize,
                    orgImgUrl: orgImg,
                    orgName: orgName,
                }

                uploadEventData('events', eventTitle, eventData)
                // console.log(res)
                navigate('/dashboard/blogs')
            }

        } catch (error) {
            console.error('error while uploading event: ', error)
        }
    }

    return (
        <DashBoard>
            <h1 className='text-center text-4xl'>Add Event Details</h1>
            <div className='w-4/5 mx-auto py-16 space-y-12'>

                <section className='space-y-5'>
                    <h2 className='text-2xl'>Organization Description</h2>
                    <div className='grid grid-cols-5 gap-4' >
                        <input
                            className="input-ghost-secondary input max-w-full col-span-2"
                            placeholder="Organization Logo URL"
                            value={orgImg}
                            onChange={(e) => setOrgImg(e.target.value)}
                        />
                        <input
                            className="input-ghost-secondary input max-w-full col-span-3"
                            placeholder="Organization Name"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                    </div>
                </section>

                <section className='space-y-5' >
                    <h2 className='text-2xl'>Event Details</h2>
                    <div className='space-y-5'>
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                className="input-ghost-secondary input max-w-full col-span-2"
                                placeholder="Event Title"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                            <select
                                className="input-ghost-secondary input transition-all duration-300 ease-in-out transform hover:scale-105"
                                value={eventType}
                                onChange={(e) => { setEventType(e.target.value) }}
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className='space-y-2'>
                                <input
                                    className="input-ghost-secondary input max-w-full"
                                    placeholder="Event Image URL"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                                <input
                                    className="input-ghost-secondary input max-w-full"
                                    placeholder="Banner Image URL"
                                    value={bannerImg}
                                    onChange={(e) => setBannerImg(e.target.value)}
                                />
                            </div>
                            <textarea
                                className="textarea-ghost-secondary textarea max-w-full max-h-full"
                                placeholder="Event Description"
                                value={desc}
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                            <input
                                className="input-ghost-secondary input max-w-full"
                                placeholder="Eligibility"
                                value={eligibility}
                                onChange={(e) => setEligibility(e.target.value)}
                            />
                            <input
                                className="input-ghost-secondary input max-w-full"
                                placeholder="Eligibility"
                                value={regFees}
                                onChange={(e) => setRegFees(e.target.value)}
                            />
                            <input
                                className="input-ghost-secondary input max-w-full"
                                placeholder="Hashtags (comma separated)"
                                value={hashtags.join(',')}
                                onChange={(e) => setHashtags(e.target.value.split(','))}
                            />
                        </div>
                    </div>
                    <section className='space-y-5'>
                        <h2 className='text-2xl'>Event Timelines</h2>
                        <div className='space-y-2'>
                            <div className='grid grid-cols-3 gap-4'>
                                <label>Registration Start:</label>
                                <input
                                    type="date"
                                    className="input-ghost-secondary input max-w-full"
                                    value={timeline[0].reg_start}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        reg_start: e.target.value
                                    }])}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                <label>Registration End:</label>
                                <input
                                    type="date"
                                    className="input-ghost-secondary input max-w-full"
                                    value={timeline[0].reg_end}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        reg_end: e.target.value
                                    }])}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                <label>Event Start:</label>
                                <input
                                    type="date"
                                    className="input-ghost-secondary input max-w-full"
                                    value={timeline[0].event_start}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        event_start: e.target.value
                                    }])}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                <label>Event End:</label>
                                <input
                                    type="date"
                                    className="input-ghost-secondary input max-w-full"
                                    value={timeline[0].event_end}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        event_end: e.target.value
                                    }])}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                <label>Event Winner Declaration:</label>
                                <input
                                    type="date"
                                    className="input-ghost-secondary input max-w-full"
                                    value={timeline[0].event_result}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        event_result: e.target.value
                                    }])}
                                />
                            </div>
                            <div>
                                <textarea
                                    className="textarea-ghost-secondary textarea max-w-full"
                                    placeholder="Note Regarding Timelines"
                                    value={timeline[0].note}
                                    onChange={(e) => setTimeline([{
                                        ...timeline[0],
                                        note: e.target.value
                                    }])}
                                />
                            </div>
                        </div>
                    </section>
                </section>

                <section className='space-y-4'>
                    <h2 className='text-2xl'>Team Size</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <input
                            type='number'
                            className="input-ghost-secondary input max-w-full"
                            placeholder="Min Team Size"
                            value={teamSize[0].min}
                            onChange={(e) => setTeamSize([{ ...teamSize[0], min: e.target.value, max: teamSize[0].max }])}
                        />
                        <input
                            type='number'
                            className="input-ghost-secondary input max-w-full"
                            placeholder="Max Team Size"
                            value={teamSize[0].max}
                            onChange={(e) => setTeamSize([{ ...teamSize[0], min: teamSize[0].min, max: e.target.value }])}
                        />
                    </div>
                    <textarea
                        className="textarea-ghost-secondary textarea max-w-full"
                        placeholder="Note Regarding Team Size"
                        value={teamSize[0].note}
                        onChange={(e) => setTeamSize([{ ...teamSize[0], note: e.target.value }])}
                    />
                </section>


                <button className="btn btn-outline-secondary w-full" onClick={handleSubmit}>
                    Publish Event
                </button>

            </div>
        </DashBoard>
    )
}

export default AddEvent;
