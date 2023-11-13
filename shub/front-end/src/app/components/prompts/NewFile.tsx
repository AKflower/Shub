import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { files as api } from "@/api";
import url from "@/utils/url";

interface NewFileProps { }

const NewFile: React.FC<NewFileProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const isFiles = useSelector((state: RootState) => state.isFiles);
    const isListing = useSelector((state: RootState) => state.isListing);

    const submit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        let uri = isFiles ? history.location.pathname + "/" : "/";

        if (!isListing) {
            uri = url.removeLastDir(uri) + "/";
        }

        uri += encodeURIComponent(name);
        uri = uri.replace("//", "/");
        try {
            await api.post(uri);
            history.push({ path: uri });
        } catch (e) {
            console.error(e);
        }

        dispatch({ type: "CLOSE_HOVER", payload: true });
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
        <div className='card floating'>
            <div className='card-title'>
                <h2>Prompts NewFile</h2>
            </div>

            <div className='card-content'>
                <p>Prompts NewFile Message</p>
                <input
                    className="input input--block"
                    type='text'
                    onKeyPress={handleKeyPress}
                    onChange={handleInputChange}
                    name={name}
                />
            </div>

            <div className='card-action'>
                <button
                    className='button button--flat button--grey'
                    onClick={() => dispatch({ type: 'CLOSE_HOVER' })}
                    aria-label='Cancel'
                    title='Cancel'>
                    Cancel
                </button>
                <button
                    className='button button--flat'
                    aria-label='Create'
                    title='Create'
                    onClick={submit}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default NewFile;
