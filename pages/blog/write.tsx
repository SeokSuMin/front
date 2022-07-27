import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space, Upload } from 'antd';
import dynamic from 'next/dynamic';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
const QuillEditor = dynamic(() => import('../../components/blog/QuillEditor'), { ssr: false });

const Wrapper = styled.div`
    width: 100%;
    padding-right: 0.63em;
`;

const WriteBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.8em;
`;

const Lable = styled.label`
    width: 8%;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 0.725em;
    margin-left: 0.725em;
`;

const WriteInput = styled(Input)`
    width: 80%;
`;

const CategoriBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;

const FileUploadBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;

const FileListBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;

const FileList = styled.div`
    padding-top: 0.5em;
    font-size: 0.875rem;
    line-height: 1.4rem;
`;

const File = styled.div`
    display: flex;
    span:first-child {
        margin-right: 0.2em;
    }
    .anticon-delete {
        margin-left: 1.5em;
        cursor: pointer;
    }
    &:hover {
        background-color: rgb(245, 245, 245);
    }
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
    }
`;

const Write = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
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
    }, []);

    return (
        <Wrapper>
            <WriteBox>
                <TitleBox>
                    <Lable>제목</Lable>
                    <WriteInput placeholder="Write Title ..." />
                </TitleBox>
                <CategoriBox>
                    <Lable>카테고리</Lable>
                    <WriteInput placeholder="Write Categori ..." />
                </CategoriBox>
                <FileUploadBox>
                    <Lable>파일첨부</Lable>
                    <input
                        type="file"
                        hidden
                        accept=".xls, .xlsx, .doc, .docx, .ppt, .pptx"
                        multiple
                        ref={inputRef}
                        onChange={onUploadFile}
                    />
                    <Button onClick={onUploadFileButtonClick} icon={<UploadOutlined />}>
                        Upload
                    </Button>
                </FileUploadBox>
                <FileListBox>
                    <Lable></Lable>
                    <FileList>
                        {[1, 2, 3, 4, 5].map((v) => {
                            return (
                                <File key={v}>
                                    <span>
                                        <PaperClipOutlined />
                                    </span>
                                    <div>테스트 파일.jpg</div>
                                    <span>
                                        <DeleteOutlined />
                                    </span>
                                </File>
                            );
                        })}
                    </FileList>
                </FileListBox>
                <ContentBox>
                    <QuillEditor />
                </ContentBox>
            </WriteBox>
        </Wrapper>
    );
};

export default Write;
