import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface ShareDeleteProps { }

const ShareDelete: React.FC<ShareDeleteProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentPrompt = useSelector((state: RootState) => state.currentPrompt);

    const submit = () => {
        currentPrompt?.confirm();
    }

    return (
        <div className='card floating'>
            <div className='card-content'>
                <p>Delete Message Share</p>
            </div>

            <div className='card-action'>
                <button
                    onClick={() => { dispatch({ type: "CLOSE_HOVER" }) }}
                    className='button button--flat button--grey'
                    aria-label='cancel'
                    title='cancel'>
                    Cancel
                </button>
                <button
                    onClick={submit}
                    className='button button--flat button--red'
                    aria-label='delete'
                    title='delete'>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ShareDelete;