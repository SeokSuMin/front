import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, InputRef, Space, Upload } from 'antd';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import WriteInput from '../../components/blog/WriteTtile';
import FileLists from '../../components/blog/FileLists';
import FileUpload from '../../components/blog/FileUpload';
dayjs().format();

const QuillEditor = dynamic(() => import('../../components/blog/QuillEditor'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    padding-right: 0.63em;
`;

const WriteBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.56rem;
`;

const ContentBox = styled.div`
    width: 100%;
    height: 45vh;
    display: flex;
    flex-direction: column;
    .quill {
        height: 100%;
        min-height: 15rem;
        flex: 1;
        strong {
            font-weight: bold;
        }
        em {
            font-style: italic;
        }
    }
`;

const Write = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const titleInputRef = useRef<InputRef | null>(null);
    const categoriInputRef = useRef<InputRef | null>(null);
    const quillRef = useRef(null);
    const [files, setFiles] = useState<File[] | null>(null);

    const onUploadFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return;
            }
            const tempFiles = [...e.target.files];

            if (!files || files.length === 0) {
                setFiles(tempFiles);
            } else {
                setFiles((prevFiles) => {
                    const insertFiles = tempFiles.filter((newFile) => {
                        if (!prevFiles.some((prevFile) => prevFile.name === newFile.name)) {
                            return true;
                        }
                    });
                    return [...prevFiles, ...insertFiles];
                });
            }
            e.target.value = '';
        },
        [files],
    );

    const onUploadFileButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, [inputRef.current]);

    const changeQuill = async (content: string) => {
        // const $ = quillRef.current.state.value
        //     ? cheerio.load(`<div id='quillContent'>${quillRef.current.state.value}</div>`)
        //     : '';
        // if ($) {
        //     const allTags = Array.from($('#quillContent').find('*'));
        //     const fileArr: File[] = [];
        //     // 이미지 변환 병렬처리
        //     await Promise.all(
        //         allTags.map(async (tag) => {
        //             if ($(tag).prop('tagName') === 'IMG') {
        //                 const base64Img = $(tag).prop('src');
        //                 const fileName = dayjs().valueOf() + base64Img.slice(-8);
        //                 const convertIamgeFile = await rlto(base64Img, fileName, { type: 'image/*' });
        //                 fileArr.push(convertIamgeFile);
        //                 $(tag).prop('src', fileName);
        //             }
        //         }),
        //     );
        //     // setFiles((prevFiles) => {
        //     //     const checkNull = prevFiles || [];
        //     //     return [...checkNull, ...fileArr];
        //     // });
        //     // console.log($.html());
        // }
        // console.log(content);
        // setContentValue(content);
    };

    return (
        <Wrapper>
            <WriteBox>
                <WriteInput {...{ titleInputRef, categoriInputRef }} />
                <FileUpload {...{ inputRef, onUploadFile, onUploadFileButtonClick }} />
                <FileLists {...{ files }} />
                <ContentBox>
                    <QuillEditor {...{ quillRef }} />
                </ContentBox>
            </WriteBox>
        </Wrapper>
    );
};

export default Write;
