import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './NewDir.module.scss'
import { useShub } from '@/app/Provider/Provider';
// import { useHistory } from 'react-router-dom';
// import { RootState } from '@/redux/store';
// import { files as api } from "@/api";
// import url from "@/utils/url";

const cx = classNames.bind(styles);

interface NewDirProps {
    redirect?: boolean;
    base?: string;
}

const NewDir: React.FC<NewDirProps> = ({ redirect, base }) => {
    // const history = useHistory();
    // const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    // const isFiles = useSelector((state: RootState) => state.isFiles);
    // const isListing = useSelector((state: RootState) => state.isListing);

    // const submit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     event.preventDefault();

    //     let uri;
    //     if (base) uri = base;
    //     else if (isFiles) uri = history.location.pathname + "/";
    //     else uri = "/";

    //     if (!isListing) {
    //         uri = url.removeLastDir(uri) + "/";
    //     }

    //     uri += encodeURIComponent(name) + "/";
    //     uri = uri.replace("//", "/");

    //     try {
    //         await api.post(uri);
    //         if (redirect) {
    //             history.push({ path: uri });
    //         } else if (!base) {
    //             const res = await api.fetch(url.removeLastDir(uri) + "/");
    //             dispatch({ type: "UPDATE_REQUEST", payload: res });
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }

    //     dispatch({ type: "CLOSE_HOVER", payload: true });
    // }]

    const { addFolder, toggleCurrentPromptName, toggleShowNewDir } = useShub();

    const submit = () => {
        addFolder(name)
        toggleCurrentPromptName()
        toggleShowNewDir()
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submit();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };


    return (
        <div className={cx('card','floating')}>
            <div className={cx('card-title')}>
                <h2>New directory</h2>
            </div>

            <div className={cx("card-content")}>
                <p>Write the name of the new directory.</p>
                <input
                    className={cx('input','input--block')}
                    type='text'
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    name={name}
                />
            </div>

            <div className={cx("card-action")}>
                <button
                    className={cx('button','button--flat',"button--grey")}
                    onClick={() => {
                        toggleCurrentPromptName()
                        toggleShowNewDir()
                        }
                    }
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className={cx('button','button--flat')}
                    aria-label='Create'
                    title='Create'
                    onClick={submit}
                    >
                    Create
                </button>
            </div>
        </div>
    )

}

export default NewDir;