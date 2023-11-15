import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { users, files as api } from "@/api";
import { enableExec } from "@/utils/constants";
import * as upload from "@/utils/upload";
import css from "@/utils/css";
import throttle from "lodash.throttle";
import HeaderBar from "@/components/header/HeaderBar";
import Action from "@/components/header/Action";
import Search from "@/components/Search";
import Item from "@/components/files/ListingItem";
import { addSelected, updateUser } from '@/store/actions';
import { unescape } from 'querystring';

interface ListingProps { }

const Listing: React.FC<ListingProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showLimit, setShowLimit] = useState(50);
    const [columnWidth, setColumnWidth] = useState(280);
    const [dragCounter, setDragCounter] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [itemWeight, setItemWeight] = useState(0);

    const { req, selected, user, multiple, loading, selectedCount, currentPrompt } = useSelector((state: RootState) => ({
        req: state.req,
        selected: state.selected,
        user: state.user,
        multiple: state.multiple,
        loading: state.loading,
        selectedCount: state.selectedCount,
        currentPrompt: state.currentPrompt,
    }))

    const nameSorted = () => {
        return req.sorting.by === "name";
    }

    const sizeSorted = () => {
        return req.sorting.by === "size";
    }

    const modifiedSorted = () => {
        return req.sorting.by === "modified";
    }

    const ascOrdered = () => {
        return req.sorting.asc;
    }

    const items = () => {
        const dirs = [];
        const files = [];

        req.items.forEach((item) => {
            if (item.isDir) {
                dirs.push(item);
            } else {
                files.push(item);
            }
        })

        return { dirs, files };
    }

    const dirs = () => {
        return items.dirs.slice(0, showLimit);
    }

    const files = () => {
        setShowLimit(showLimit - items.dirs.length);

        if (showLimit < 0) setShowLimit(0);

        return items.files.slice(0, showLimit);
    }

    const nameIcon = () => {
        if (nameSorted() && !ascOrdered()) {
            return "arrow_upward";
        }

        return "arrow_downward";
    }

    const sizeIcon = () => {
        if (sizeSorted() && ascOrdered()) {
            return "arrow_downward";
        }

        return "arrow_upward";
    }

    const modifiedIcon = () => {
        if (modifiedSorted() && ascOrdered()) {
            return "arrow_downward";
        }

        return "arrow_upward";
    }

    const viewIcon = () => {
        const icons = {
            list: "view_module",
            mosaic: "grid_view",
            "mosaic gallery": "view_list",
        }

        return icons[user.viewMode];
    }

    const headerButtons = () => {
        return {
            upload: user.perm.create,
            download: user.perm.download,
            shell: user.perm.execute && enableExec,
            delete: selectedCount > 0 && user.perm.delete,
            rename: selectedCount === 1 && user.perm.rename,
            share: selectedCount === 1 && user.perm.share,
            move: selectedCount > 0 && user.perm.rename,
            copy: selectedCount > 0 && user.perm.create,
        }
    }

    const isMobile = () => {
        return width <= 736;
    }

    useEffect(() => {
        columnsResize();
        setItemWeight();
        fillWindow(true);

        window.addEventListener("keydown", keyEvent);
        window.addEventListener("scroll", scrollEvent);
        window.addEventListener("resize", windowsResize);

        if (!user.perm.create) return;
        document.addEventListener("dragover", preventDefault);
        document.addEventListener("dragenter", dragEnter);
        document.addEventListener("dragleave", dragLeave);
        document.addEventListener("drop", drop);

        return () => {
            window.removeEventListener("keydown", keyEvent);
            window.removeEventListener("scroll", scrollEvent);
            window.removeEventListener("resize", windowsResize);

            if (user && !user.perm.create) return;
            document.removeEventListener("dragover", preventDefault);
            document.removeEventListener("dragenter", dragEnter);
            document.removeEventListener("dragleave", dragLeave);
            document.removeEventListener("drop", drop);
        }
    }, [])

    const base64 = (name) => {
        return window.btoa(unescape(encodeURIComponent(name)));
    }

    const keyEvent = (event) => {
        if (currentPrompt !== null) {
            return;
        }

        if (event.keyCode === 27) {
            dispatch({ type: "RESET_SELECTED" });
        }

        if (event.keyCode === 46) {
            if (!user.perm.delete || selectedCount == 0) return;

            dispatch({ type: "SHOW_HOVER", payloa: "DELETE" });
        }

        if (event.keyCode === 113) {
            if (!user.perm.rename || selectedCount !== 1) return;

            dispatch({ type: "SHOW_HOVER", payloa: "RENAME" });
        }

        if (!event.ctrlKey && !event.metaKey) {
            return;
        }

        let key = String.fromCharCode(event.which).toLowerCase();

        switch (key) {
            case "f":
                event.preventDefault();
                dispatch({ type: "SHOW_HOVER", payloa: "SEARCH" });
                break;
            case "c":
            case "x":
                copyCut(event, key);
                break;
            case "v":
                paste(event);
                break;
            case "a":
                event.preventDefault();
                for (let file of items.files) {
                    if (selected.indexOf(file.index) === -1) {
                        addSelected(file.index);
                    }
                }
                for (let dir of items.dirs) {
                    if (selected.indexOf(dir.index) === -1) {
                        addSelected(dir.index);
                    }
                }
                break;
            case "s":
                event.preventDefault();
                document.getElementById("download-button").click();
                break;
        }

    }

    const preventDefault = (event) => {
        event.preventDefault();
    }

    const copyCut = (event, key) => {
        if (event.target.tagName.toLowerCase() === "input") {
            return;
        }

        let items = [];

        for (let i of selected) {
            items.push({
                from: req.items[i].url,
                name: req.items[i].name,
            });
        }

        if (items.length == 0) {
            return;
        }

        dispatch({
            type: "UPDATE_CLIPBOARD", payload: {
                key: key,
                items: items,
                path: history.location.pathname,
            }
        });
    }

    const paste = (event) => {
        if (event.target.tagName.toLowerCase() === "input") {
            return;
        }

        let items = [];

        for (let item of clipboard.items) {
            const from = item.from.endsWith("/")
                ? item.from.slice(0, -1)
                : item.from;
            const to = history.loaction.pathname + encodeURIComponent(item.name);
            items.push({ from, to, name: item.name });
        }

        if (items.length === 0) {
            return;
        }
    }

    return (
        <div>
            <HeaderBar showMenu showLogo>
                <Search />
                <title />
                <Action
                    classname="search-button"
                    icons="search"
                    label="search"
                    action={openSearch} />

            </HeaderBar>
        </div>
    )
}

export default Listing;