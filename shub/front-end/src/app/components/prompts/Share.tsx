import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Share.module.scss'

const cx = classNames.bind(styles);

interface ShareProps {

}

const Share: React.FC<ShareProps> = () => {

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
