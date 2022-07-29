import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
    padding-top: 0.5em;
    font-size: 0.875rem;
    line-height: 1.4rem;
`;

const Files = styled.div`
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

interface IFileListsProps {
    files: File[];
    deleteFile: (fileName: string) => void;
}

const FileLists = ({ files, deleteFile }: IFileListsProps) => {
    return (
        <FileListBox>
            <Lable></Lable>
            <FileList>
                {files?.map((file) => {
                    return (
                        <Files key={file.lastModified}>
                            <span>
                                <PaperClipOutlined />
                            </span>
                            <div>{file.name}</div>
                            <span>
                                <DeleteOutlined onClick={() => deleteFile(file.name)} />
                            </span>
                        </Files>
                    );
                })}
            </FileList>
        </FileListBox>
    );
};

export default FileLists;
