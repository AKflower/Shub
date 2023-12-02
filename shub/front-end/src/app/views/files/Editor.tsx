import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { files as api } from "@/api";
import { theme } from "@/utils/constants";
import buttons from "@/utils/buttons";
import url from "@/utils/url";
import HeaderBar from "@/components/header/HeaderBar";
import Action from "@/components/header/Action";
import Breadcrumbs from "@/components/Breadcrumbs";

interface EditorProps { }

const Editor: React.FC<EditorProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { req, user } = useSelector((state: RootState) => ({
        req: state.req,
        user: state.user,
    }))

    const readcrumbs = () => {
        let parts = history.location.pathname.split("/");

        if (parts[0] === "") {
            parts.shift();
        }

        if (parts[parts.length - 1] === "") {
            parts.pop();
        }

        let breadcrumbs = [];

        for (let i = 0; i < parts.length; i++) {
            breadcrumbs.push({ name: decodeURIComponent(parts[i]) });
        }

        breadcrumbs.shift();

        if (breadcrumbs.length > 3) {
            while (breadcrumbs.length !== 4) {
                breadcrumbs.shift();
            }

            breadcrumbs[0].name = "...";
        }

        return breadcrumbs;
    }

    useEffect(() => {
        window.addEventListener("keydown", keyEvent);

        return () => {
            window.removeEventListener("keydown", keyEvent);
        }
    }, []);

    const back = () => {
        let uri = url.removeLastDir(history.location.pathname) + "/";
        history.push({ path: uri });
    }

    const keyEvent = (event) => {
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }

        if (String.fromCharCode(event.which).toLowerCase() !== "s") {
            return;
        }

        event.preventDefault();

        save();
    }

    const save() = async () => {
        const button = "save";
        button.loading("save");

        try {
            await api.put(history.location.pathname, editor.getValue());
            buttons.success(button);
        } catch (e) {
            buttons.done(button);
            console.error(e);
        }
    }

    const close = () => {
        dispatch({ type: "UPDATE_REQUEST", payload: {} });
        let uri = url.removeLastDir(history.location.pathname) + "/";
        history.push({ path: uri });
    }

    return (
        <div className='editor-container'>
            <HeaderBar>
                <Action
                    icon='close'
                    label='close'
                    action={close}
                />
                <title>{req.name}</title>
                {user.perm.modify && (
                    <Action
                        id='save-button'
                        icon='save'
                        label='save'
                        action={save}
                    />
                )}
            </HeaderBar>

            <Breadcrumbs base="/files" noLink />

            <form id="editor"></form>
        </div>
    )
}

export default Editor;