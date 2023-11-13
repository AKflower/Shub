import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';
import FileList from "./FileList";
import { files as api } from "@/api";
import buttons from "@/utils/buttons";
import * as upload from "@/utils/upload";

interface MoveProps { }

const Move: React.FC<MoveProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { req, selected, user } = useSelector((state: RootState) => ({
        req: state.req,
        selected: state.selected,
        user: state.user,
    }));
    const [current, setCurrent] = useState<string>(window.location.pathname);
    const [dest, setDest] = useState<string | null>(null);
    useEffect(() => {
        setCurrent(window.location.pathname);
    }, []);
    const move = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        let items: any[] = [];

        for (let item of selected) {
            items.push({
                from: req.items[item].url,
                to: dest + encodeURIComponent(req.items[item].name),
                name: req.items[item].name,
            });
        }

        let action = async (overwrite: boolean, rename: boolean) => {
            buttons.loading('move');

            try {
                await api.move(items, overwrite, rename);

                buttons.success('move');
                history.push(dest as string);
            } catch (e) {
                buttons.done('move');
                console.error(e);
            }
        };

        let dstItems = (await api.fetch(dest as string)).items;
        let conflict = upload.checkConflict(items, dstItems);

        let overwrite = false;
        let rename = false;

        if (conflict) {
            dispatch({
                type: 'SHOW_HOVER',
                payload: {
                    prompt: 'replace-rename',
                    confirm: (event: { preventDefault: () => void; }, option: string) => {
                        overwrite = option === 'overwrite';
                        rename = option === 'rename';

                        event.preventDefault();
                        dispatch({ type: 'CLOSE_HOVERS' });
                        action(overwrite, rename);
                    },
                },
            });

            return;
        }

        action(overwrite, rename);
    };

    return (
        <div className="card floating">
            <div className='card-title' >
                <h2>Prompts Move</h2>
            </div>

            <div className='card-content' >
                <FileList ref="fileList" onUpdateSelected={(val: React.SetStateAction<string | null>) => setDest(val)} />
            </div >

            <div
                className="card-action"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {user.perm.create && (
                    <button
                        className="button button--flat"
                        onClick={() => this.refs.fileList.createDir()}
                        aria-label="New Folder"
                        title="New Folder"
                        style={{ justifySelf: 'left' }}
                    >
                        <span>New Folder</span>
                    </button>
                )}
                <div>
                    <button
                        className="button button--flat button--grey"
                        onClick={() => dispatch({ type: 'CLOSE_HOVERS' })}
                        aria-label="Cancel"
                        title="Cancel"
                    >
                        Cancel
                    </button>
                    <button
                        className="button button--flat"
                        onClick={move}
                        disabled={history.location.pathname === dest}
                        aria-label="Move"
                        title="Move"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Move;
