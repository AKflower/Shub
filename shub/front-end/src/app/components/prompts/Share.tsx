import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { RootState } from '@/redux/store';
// import { share as api, pub as pub_api } from "@/api";
// import moment from "moment";
// import Clipboard from "clipboard";
import classNames from 'classnames/bind';
import styles from './Share.module.scss'

const cx = classNames.bind(styles);

interface ShareProps {

}

const Share: React.FC<ShareProps> = () => {
    // const history = useHistory();
    // const dispatch = useDispatch();
    // const [time, setTime] = useState<number>(0);
    // const [unit, setUnit] = useState("hours");
    // const [links, setLinks] = useState([]);
    // const [clip, setClip] = useState(null);
    // const [password, setPassword] = useState("");
    // const [listing, setListing] = useState(true);
    // const { req, selected, selectedCount, isListing } = useSelector((state: RootState) => ({
    //     req: state.req,
    //     selected: state.selected,
    //     selectedCount: state.selectedCount,
    //     isListing: state.isListing,
    // }));
    // const url = () => {
    //     if (!isListing) {
    //         return history.location.pathname;
    //     }

    //     if (selectedCount === 0 || selectedCount > 1) {
    //         return;
    //     }

    //     return req.items[selected[0]].url;
    // }

    // useEffect(() => {
    //     try {
    //         const link = await api.get(url);
    //         setLinks(link);
    //         sort();

    //         if (links.length == 0) {
    //             setListing(false);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }

    //     setClip(new Clipboard(".copy-clipboard"));
    //     clip.on("success", () => {
    //         showSuccess();
    //     })

    //     return () => {
    //         clip.destroy();
    //     }
    // }, []);

    // const submit = async () => {
    //     let isPermanent = time == 0;
    //     try {
    //         let res = null;

    //         if (isPermanent) {
    //             res = await api.create(url, password);
    //         } else {
    //             res = await api.create(url, password, time, unit);
    //         }

    //         links.push(res);
    //         sort();

    //         setTime(0);
    //         setUnit("hours");
    //         setPassword("");
    //         setListing(true);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // const deleteLink = async (event, link) => {
    //     event.preventDefault();

    //     try {
    //         await api.remove(link.hash);
    //         setLinks(links.filter((item) => item.hash !== link.hash));

    //         if (links.length == 0) {
    //             setListing(false);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // const humanTime = (time) => {
    //     return moment(time * 1000).fromNow();
    // }

    // const buildLink = (share) => {
    //     return api.getShareURL(share);
    // }

    // const hasDownloadLink = () => {
    //     return selected.length === 1 && !req.items[selected[0]].isDir;
    // }

    // const buildDownloadLink = (share) => {
    //     return pub_api.getDownloadURL(share);
    // }

    // const sort = () => {
    //     setLinks(links.sort((a, b) => {
    //         if (a.expire === 0) return -1;
    //         if (b.expire === 0) return 1;
    //         return new Date(a.expire) - new Date(b.expire);
    //     }))
    // }

    // const switchListing = () => {
    //     if (links.length == 0 && !listing) {
    //         dispatch({ type: "CLOSE_HOVER" });
    //     }

    //     setListing(!listing);
    // }

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         submit();
    //     }
    // };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTime(event.target.value);
    // };

    // const handleUnitChange = (event) => {
    //     setUnit(event.target.value);
    // };

    const [listing, setListing] = useState('')

    return (
        <div className={cx('card','floating','share__promt_card')} id={cx('share')}>
            <div className={cx('card-title')}>
                <h2>Prompt Share</h2>
            </div>

            {listing && (
                <>
                    <div className={cx("card-content")}>
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Share Duration</th>
                                <th></th>
                                <th></th>
                            </tr>

                            {/* {links.map((link) => (
                                <tr key={link.hash}>
                                    <td>{link.hash}</td>
                                    {(links.expire !== 0) && (
                                        <td>{humanTime(link.expire)}</td>
                                    )}
                                    {(links.expire == 0) && (
                                        <td>Permanent</td>
                                    )}
                                    <td className='small'>
                                        <button
                                            className='action copy-clipboard'
                                            data-clipboard-text={buildLink(link)}
                                            aria-label='copyToClipboard'
                                            title='copyToClipboard'>
                                            <i className='material-icons'>content_paste</i>
                                        </button>
                                    </td>
                                    {hasDownloadLink() && (
                                        <td className='small'>
                                            <button
                                                className='action copy-clipboard'
                                                data-clipboard-text={buildLink(link)}
                                                aria-label='copyDownloadLinkToClipboard'
                                                title='copyDownloadLinkToClipboard'>
                                                <i className='material-icons'>content_paste_go</i>
                                            </button>
                                        </td>
                                    )}
                                    <td className='small'>
                                        <button
                                            className='action'
                                            onClick={deleteLink(event, link)}
                                            aria-label='delete'
                                            title='delete'>
                                            <i className='material-icons'>delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))} */}
                        </table>
                    </div>
                    <div className={cx("card-action")}>
                        <button
                            className={cx('button','button--flat',"button--grey")}
                            // onClick={() => { dispatch({ type: "CLOSE_HOVER" }) }}
                            aria-label='close'
                            title='close'>
                            Close
                        </button>
                        <button
                            className={cx('button','button--flat',"button--blue")}
                            // onClick={switchListing}
                            aria-label='new'
                            title='new'>
                            New
                        </button>
                    </div>
                </>
            )}

            <div className={cx("card-content")}>
                <p>Share Duration</p>
                <div className={cx("input-group", 'input')}>
                    <input type='number'
                        max={214748364}
                        min={1}
                        // onKeyPress={handleKeyPress}
                        // onChange={handleInputChange}
                        // value={time}
                        >
                            
                        </input>
                    <select className={cx("right")}
                    // value={unit} onChange={handleUnitChange} 
                    aria-label='timeUnit'>
                        <option value="seconds">Seconds</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                    </select>
                </div>
                <p>Optional Password</p>
                <input
                    className={cx('input','input--block')}
                    type='password'
                    // value={password}
                    >
                        
                    </input>
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    // onClick={switchListing}
                    aria-label='cancel'
                    title='cancel'>Cancel</button>
                <button
                    className={cx('button','button--flat',"button--blue")}
                    // onClick={submit}
                    aria-label='share'
                    title='share'
                >Share</button>
            </div>
        </div>
    )
}

export default Share;
