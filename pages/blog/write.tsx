import { Button, InputRef } from 'antd';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import WriteInput from '../../components/blog/WriteTtile';
import FileLists from '../../components/blog/FileLists';
import FileUpload from '../../components/blog/FileUpload';
import * as Cheerio from 'cheerio';
import { rlto } from '../../util';

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
    /* min-height: 20rem; */
    display: flex;
    flex-direction: column;

    .ql-editor {
        min-height: 25rem;
        max-height: 35rem;
    }
    .ql-editor {
        overflow-y: auto;
        resize: vertical;
    }
    strong {
        font-weight: bold;
    }
    em {
        font-style: italic;
    }
`;

const SendBox = styled.div`
    padding-top: 0.63em;
    text-align: right;
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

    const deleteFile = (fileName: string) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((file) => file.name !== fileName);
        });
    };

    const submit = async () => {
        try {
            const $ = quillRef.current.state.value
                ? Cheerio.load(`<div id='quillContent'>${quillRef.current.state.value}</div>`)
                : '';
            const formData = new FormData();
            const fileArr: File[] = [...files];
            // 에디터 내용이 존재하면
            if ($) {
                const allTags = Array.from($('#quillContent').find('*'));
                // 이미지 변환 병렬처리
                await Promise.all(
                    allTags.map(async (tag) => {
                        if ($(tag).prop('tagName') === 'IMG') {
                            const base64Img = $(tag).prop('src');
                            const fileName = dayjs().valueOf() + base64Img.slice(-8).replace(/\//g, '');
                            const convertIamgeFile = await rlto(base64Img, fileName, { type: 'image/*' });
                            fileArr.push(convertIamgeFile);
                            $(tag).prop('src', fileName);
                        }
                    }),
                );
                for (const file of fileArr) {
                    formData.append('files', file);
                }

                const content = $.html().replace('<html><head></head><body>', '').replace('</body></html>', '');
                formData.append('content', content);
            }

            const title = titleInputRef.current.input.value;
            const categori = categoriInputRef.current.input.value;
            formData.append('title', title);
            formData.append('categori', categori);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Wrapper>
            <WriteBox>
                <WriteInput {...{ titleInputRef, categoriInputRef }} />
                <FileUpload {...{ inputRef, onUploadFile, onUploadFileButtonClick }} />
                <FileLists {...{ files, deleteFile }} />
                <ContentBox>
                    <QuillEditor {...{ quillRef }} />
                </ContentBox>
            </WriteBox>
            <SendBox>
                <Button onClick={submit} type="primary">
                    작성완료
                </Button>
            </SendBox>
        </Wrapper>
    );
};

export default Write;
