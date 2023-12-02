import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface ReplaceRenameProps {
}

const ReplaceRename: React.FC<ReplaceProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentPrompt = useSelector((state: RootState) => state.currentPrompt);

    return (
        <div className='card floating'>
            <div className='card-title'>
                <h2>Prompts Replace</h2>
            </div>

            <div className='card-content'>
                <p>Prompts Replace Message</p>
            </div>

            <div className='card-action'>
                <button
                    className='button button--flat button-grey'
                    onClick={() => { dispatch({ type: "CLOSE_HOVER" }) }}
                    aria-label='cancel'
                    title='cancel'>
                    Cancel
                </button>
                <button
                    className='button button--flat button-blue'
                    onClick={currentPrompt.confirm(event, "rename")}
                    aria-label='rename'
                    title='rename'>
                    Rename
                </button>
                <button
                    className='button button--flat button-red'
                    onClick={currentPrompt.confirm(event, "overwrite")}
                    aria-label='replace'
                    title='replace'>
                    Replace
                </button>
            </div>
        </div>
    )
}

export default ReplaceRename;