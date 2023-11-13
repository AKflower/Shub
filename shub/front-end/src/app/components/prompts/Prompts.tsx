import { FC, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/redux/store';
import Help from "./Help";
import Info from "./Info";
import Delete from "./Delete";
import Rename from "./Rename";
import Download from "./Download";
import Move from "./Move";
import Copy from "./Copy";
import NewFile from "./NewFile";
import NewDir from "./NewDir";
import Replace from "./Replace";
import ReplaceRename from "./ReplaceRename";
import Share from "./Share";
import Upload from "./Upload";
import ShareDelete from "./ShareDelete";
import Sidebar from "../sidebar/sidebar";
import buttons from "@/utils/buttons";

interface PromptsProps { }

const Prompts: React.FC<PromptsProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentPromptRef = useRef<HTMLElement>(null);
    const [pluginData, setPluginData] = [buttons, dispatch, history];
    const { plugins, currentPrompt, currentPromptName } = useSelector((state: RootState) => ({
        plugins: state.plugins,
        currentPrompt: state.currentPrompt,
        currentPromptName: state.currentPromptName,
    }));

    const showOverlay = () => {
        return (
            currentPrompt !== null &&
            currentPrompt.prompt !== "search" &&
            currentPrompt.prompt !== "more"
        )
    }

    useEffect((event) => {
        if (currentPrompt == null) return;

        let prompt = currentPromptRef.current!;

        if (event.keyCode === 27) {
            event.stopImmediatePropagation();
            dispatch({ type: "CLOSE_HOVER" });
        }

        if (event.keyCode === 13) {
            switch (currentPrompt.prompt) {
                case "delete":
                    prompt.submit();
                    break;
                case: "copy":
                    prompt.copy(event);
                    break;
                case: "move":
                    prompt.move(event);
                    break;
                case: "replace":
                    prompt.showConfirm(event);
                    break;
            }
        }
    }, [])

    const resetPrompts = () => {
        dispatch({ type: "CLOSE_HOVER" });
    }
    return (
        <div>
            {showOverlay() && (
                <div ref={currentPromptRef}>
                    {React.createElement(currentPromptName, { ...currentPrompt.props })}
                </div>
            )}
            {showOverlay() && <div onClick={resetPrompts} className="overlay"></div>}
        </div>
    )
}

export default Prompts;