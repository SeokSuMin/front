import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space, Upload } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
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
    width: 40%;
    padding: 0.63em;
    border: 0.063em solid rgb(217, 217, 217);
    font-size: 0.875rem;
    table {
        width: 100%;
        text-align: center;
    }
    table thead tr th {
        padding: 0px 0px 5px 0px;
    }
    table tr th:nth-child(1),
    table tr td:nth-child(1),
    table tr th:nth-child(2),
    table tr td:nth-child(2) {
        text-align: left;
    }
    table td {
        padding: 2px 0px;
    }
`;

const File = styled.div`
    display: flex;
    align-items: center;
`;

const ContentBox = styled.div``;

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
                {/* <FileListBox>
                    <Lable></Lable>
                    <FileList>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>
                                        <Checkbox></Checkbox>
                                    </th>
                                    <th style={{ width: '50%' }}>파일명</th>
                                    <th style={{ width: '30%' }}>용량</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4].map((v) => {
                                    return (
                                        <React.Fragment key={v}>
                                            <tr>
                                                <td>
                                                    <Checkbox></Checkbox>
                                                </td>
                                                <td>
                                                    <span>테스트 파일.png</span>
                                                </td>
                                                <td>
                                                    <span>1258.kB</span>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </FileList>
                </FileListBox> */}
                <ContentBox></ContentBox>
            </WriteBox>
        </Wrapper>
    );
};

export default Write;
