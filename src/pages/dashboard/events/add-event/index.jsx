import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

import { useFirestore } from '../../../../context/FirestoreContext';
import DashBoard from '../../../../components/frames/dashboard';

const AddEvent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [img, setImg] = useState('');
    const [desc, setDesc] = useState('');
    const [bannerImg, setBannerImg] = useState('');
    const [eligibility, setEligibility] = useState('');
    const [brief, setBrief] = useState()
    const [problemStatement, setProblemStatement] = useState()
    const [archive, setArchive] = useState(false)
    const [hashtags, setHashtags] = useState([]);
    const [teamSize, setTeamSize] = useState([{
        min: 1,
        max: 1,
        note: '',
    }]);
    // const [orgDtls, setOrgDtls] = useState([
    //     {
    //         name: 'Brandladder',
    //         logo: 'https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2FScreenshot%202024-02-28%20002631.png?alt=media&token=3f934703-2f7d-47e9-9f9e-dd988b3c8be7',
    //         webLink: 'https://brandladder.co.in/',
    //     }
    // ])

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

    const orgDtls = [
        {
            name: 'Brandladder',
            logo: 'https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2FScreenshot%202024-02-28%20002631.png?alt=media&token=3f934703-2f7d-47e9-9f9e-dd988b3c8be7',
            webLink: 'https://brandladder.co.in/',
        }
    ]

    const handleKeyDown = (event, editor) => {
        // const selection = editor.selection;
        // const selectedElement = selection.current();
        // console.log(selectedElement);
    };

    const { storeData: uploadEventData } = useFirestore()
    const navigate = useNavigate()
    const brifEditor = useRef(null);

    const handleSubmit = () => {

        setIsLoading(true);

        try {

            const fieldValueCheck = eventTitle !== '' && img !== '' && bannerImg !== '' && desc !== ''

            if (fieldValueCheck) {
                const eventData = {
                    eventTitle: eventTitle,
                    eventImage: img,
                    bannerImg: bannerImg,
                    eventDesc: desc,
                    hashtags: hashtags,
                    eventType: 'Online',
                    eventTimeline: timeline,
                    teamSize: teamSize,
                    orgDtls: orgDtls,
                    eligibility: eligibility,
                    eventBrief: brief,
                    problemStatement: problemStatement,
                    date: new Date(),
                    archive: archive,
                }

                uploadEventData('events', eventTitle, eventData)
                // console.log(eventData)
                navigate('/dashboard/all-events')
            }

        } catch (error) {
            console.error('error while uploading event: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DashBoard>
            <h1 className='text-center text-4xl'>Add Event Details</h1>
            <div className='w-4/5 mx-auto py-16 space-y-12'>

                <section className='space-y-5' >
                    <h2 className='text-2xl'>Event Details</h2>
                    <div className='space-y-5'>
                        <input
                            className="input-ghost-secondary input max-w-full"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                        {/* <select
                                className="input-ghost-secondary input "
                                value={eventType}
                                onChange={(e) => { setEventType(e.target.value) }}
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select> */}

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
                                placeholder="Hashtags (comma separated)"
                                value={hashtags.join(',')}
                                onChange={(e) => setHashtags(e.target.value.split(','))}
                            />
                        </div>
                    </div>
                    <section className='space-y-4'>
                        <h2 className='text-2xl' >Event Brief</h2>
                        <JoditEditor
                            className='text-black w-1'
                            ref={brifEditor}
                            value={brief}
                            tabIndex={1}
                            onBlur={(newContent) => setBrief(newContent)}
                            onChange={(newContent) => setBrief(newContent)}
                            onInit={(editor) => {
                                editor.events.on('keydown', (event) => {
                                    handleKeyDown(event, editor);
                                });
                            }}
                        />
                    </section>
                    <section className='space-y-4'>
                        <h2 className='text-2xl' >Problem Statement</h2>
                        <JoditEditor
                            className='text-black w-1'
                            ref={brifEditor}
                            value={problemStatement}
                            tabIndex={1}
                            onBlur={(newContent) => setProblemStatement(newContent)}
                            onChange={(newContent) => setProblemStatement(newContent)}
                            onInit={(editor) => {
                                editor.events.on('keydown', (event) => {
                                    handleKeyDown(event, editor);
                                });
                            }}
                        />
                    </section>
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

                    <div className="flex items-center space-x-2">
                        <span>Archive Event:</span>
                        {/* <label className="switch switch-ghost-secondary">
                            <input type="checkbox" checked={archive} onChange={() => setArchive(!archive)} />
                            <span className="slider round"></span>
                        </label> */}
                        <input
                            type="checkbox" className="switch switch-ghost-secondary"
                            checked={archive}
                            onChange={() => setArchive(!archive)} />
                    </div>

                </section>

                {
                    isLoading ? (
                        <button className="btn btn-outline-secondary btn-loading w-full" onClick={handleSubmit}>
                            Loading
                        </button>
                    ) : (
                        <button className="btn btn-outline-secondary w-full" onClick={handleSubmit}>
                            Publish Event
                        </button>
                    )
                }


            </div>
        </DashBoard>
    )
}

export default AddEvent;
