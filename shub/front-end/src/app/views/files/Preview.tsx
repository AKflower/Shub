import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '@/store';
import { files as api } from "@/api";
import { resizePreview } from "@/utils/constants";
import url from "@/utils/url";
import throttle from "lodash.throttle";
import HeaderBar from "@/components/header/HeaderBar";
import Action from "@/components/header/Action";
import ExtendedImage from "@/components/files/ExtendedImage";
import Head from 'next/head';

interface PreviewProps {
}

const Preview: React.FC<PreviewProps> = () => {
    const name;
    const toggleNavigation = () => {

    }
    const isResizeEnabled = () => {
        return 0;
    }

    const fullSize = () => {
        return 0;
    }

    const toggleSize = () => {

    }

    const loading = () => {

    }
    return (
        <div
            id='previewer'
            onMouseMove={toggleNavigation}
            onTouchStart={toggleNavigation}>
            <HeaderBar>
                <Action
                    icon='close'
                    label='close'
                    action={close} />
                <title>{name}</title>
                {isResizeEnabled() && requestAnimationFrame.type === 'image' && (
                    <Action
                        disabled={loading}
                        icon={fullSize() ? 'photo_size_select_large' : 'hd'}
                        action={toggleSize} />
                )}

            </HeaderBar>
        </div>
    )
}

export default Preview;