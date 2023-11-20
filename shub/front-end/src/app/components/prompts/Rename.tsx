import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Rename.module.scss'
// import { useHistory } from 'react-router-dom';
// import { RootState } from '@/redux/store';
// import url from "@/utils/url";
// import { files as api } from "@/api";

const cx = classNames.bind(styles);

interface RenameProps { }

const Rename: React.FC<RenameProps> = () => {
    // const history = useHistory();
    // const dispatch = useDispatch();
    // const [name, setName] = useState<string>("");

    // setName(oldName());

    // const { req, selected, selectedCount, isListing } = useSelector((state: RootState) => ({
    //     req: state.req,
    //     selected: state.selected,
    //     selectedCount: state.selectedCount,
    //     isListing: state.isListing,
    // }));

    // const Cancel = () => {
    //     dispatch({ type: "CLOSE_HOVER" });
    // }

    // const oldName = () => {
    //     if (!isListing) {
    //         return req.name;
    //     }

    //     if (selectedCount === 0 || selectedCount > 1) {
    //         return;
    //     }

    //     return req.items[selected[0]].name;
    // }

    // const submit = async () => {
    //     let oldLink = "";
    //     let newLink = "";

    //     if (!isListing) {
    //         oldLink = req.url;
    //     } else {
    //         oldLink = req.items[selected[0]].url;
    //     }

    //     newLink = url.removeLastDir(oldLink) + "/" + encodeURIComponent(name);

    //     try {
    //         await api.move([{ from: oldLink, to: newLink }]);
    //         if (!isListing) {
    //             history.push({ path: newLink });
    //             return;
    //         }

    //         dispatch({ type: "SET_REALOAD", payload: true });
    //     } catch (e) {
    //         console.error(e);
    //     }

    //     dispatch({ type: "CLOSE_HOVER" });
    // }

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         submit();
    //     }
    // };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(event.target.value);
    // };

    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>Rename</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Insert a new name for
                    {/* {oldName()} */}
                </p>
                <input
                    className={cx("input",'input--block')}
                    type="text"
                    // onKeyPress={handleKeyPress}
                    // onChange={handleInputChange}
                    // name={name}
                    >
                
                </input>
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    // onClick={() => { dispatch({ type: "CLOSE_HOVER" }) }}
                    aria-label='cancel'
                    title='cancel'>
                    Cancel
                </button>
                <button
                    // onClick={submit}
                    className={cx('button','button--flat')}
                    type='submit'
                    aria-label='rename'
                    title='rename'>
                    Rename
                </button>
            </div>
        </div>
    )
}

export default Rename;