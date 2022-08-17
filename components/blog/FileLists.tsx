import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/hooks';

const Lable = styled.label`
    width: 8%;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 0.725em;
    margin-left: 0.725em;
`;

const FileListBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
`;

const FileList = styled.div`
    width: 100%;
    padding-top: 0.5em;
    font-size: 0.875rem;
    line-height: 1.4rem;
`;

const FileBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    div {
        margin-bottom: 5px;
    }
    div span.percentText {
        font-size: 0.75rem;
        margin-left: 0.417em;
        font-weight: bold;
    }
`;

const Files = styled.div`
    width: 40%;
    position: relative;
    background-color: transparent;
    z-index: 1;
    border-radius: 0.188rem;
    margin-bottom: 0.357em;
    font-size: 0.813rem;
    display: flex;
    align-items: center;
    span:first-child {
        margin-right: 0.2em;
    }
    .delete {
        margin-left: auto;
        margin-right: 0.625em;
        cursor: pointer;
    }
    &:hover {
        background-color: rgb(245, 245, 245);
    }
`;

const Progress = styled.div`
    height: 100%;
    background-color: rgba(41, 181, 134, 1);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
`;

interface IFileListsProps {
    deleteFile: (fileName: string) => void;
}

const FileLists = ({ deleteFile }: IFileListsProps) => {
    const { uploadFiles } = useAppSelector((state) => state.blog);

    return (
        <FileListBox>
            <Lable></Lable>
            <FileList>
                {uploadFiles?.map((file) => {
                    return (
                        <FileBox key={file.fileId}>
                            <Files>
                                <span>
                                    <PaperClipOutlined />
                                    {file.fileName}
                                </span>
                                <span className="delete">
                                    <DeleteOutlined onClick={() => deleteFile(file.fileName)} />
                                </span>
                                <Progress style={{ width: file.progress + '%' }}></Progress>
                            </Files>
                            {/* <div>
                                <span className="percentText">{file.progress}%</span>
                            </div> */}
                        </FileBox>
                    );
                })}
            </FileList>
        </FileListBox>
    );
};

export default FileLists;
