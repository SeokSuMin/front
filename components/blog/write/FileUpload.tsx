import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

const FileUploadBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.9em;
    button {
        height: 1.7rem;
        display: flex;
        align-items: center;
    }
`;

const Lable = styled.label`
    width: 10%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
    /* margin-left: 0.725em; */
`;

interface IFileUploadProps {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
    onUploadFileButtonClick: (type: string) => void;
}

const FileUpload = ({ inputRef, onUploadFile, onUploadFileButtonClick }: IFileUploadProps) => {
    return (
        <FileUploadBox>
            <Lable>파일첨부</Lable>
            <input
                type="file"
                hidden
                accept=".xls, .xlsx, .doc, .docx, .ppt, .pptx"
                multiple
                ref={inputRef}
                onChange={(e) => onUploadFile(e, 'file')}
            />
            <Button onClick={() => onUploadFileButtonClick('file')} icon={<UploadOutlined />}>
                Upload
            </Button>
        </FileUploadBox>
    );
};

export default memo(FileUpload);
