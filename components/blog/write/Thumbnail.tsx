import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';
import XToggle from '../../../public/x-Toggle.svg';

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 0.9em;
    button {
        height: 1.7rem;
        display: flex;
        align-items: center;
    }
`;

const ThumbFileUploadBox = styled.div`
    display: flex;
    align-items: center;
`;

const PreviewThumbFileBox = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 0.9em;
    img {
        width: 15.625rem;
        height: 9.688rem;
    }
`;

const DeleteThumbFileButton = styled.span`
    width: 0.8rem;
    margin-left: 0.938em;
    cursor: pointer;
`;

const Lable = styled.label`
    width: 10%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
`;

interface ThumbnailProps {
    thumbInputRef: React.MutableRefObject<HTMLInputElement | null>;
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
    onUploadFileButtonClick: (type: string) => void;
    thumbImgURL: string | ArrayBuffer;
    deleteThumbImg: () => void;
}

const Thumbnail = ({
    thumbInputRef,
    onUploadFile,
    onUploadFileButtonClick,
    thumbImgURL,
    deleteThumbImg,
}: ThumbnailProps) => {
    return (
        <Wrapper>
            <ThumbFileUploadBox>
                <Lable>썸네일</Lable>
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={thumbInputRef}
                    onChange={(e) => onUploadFile(e, 'thumb')}
                />
                <Button onClick={() => onUploadFileButtonClick('thumb')} icon={<UploadOutlined />}>
                    이미지
                </Button>
            </ThumbFileUploadBox>
            {thumbImgURL ? (
                <PreviewThumbFileBox>
                    <Lable></Lable>
                    <img src={thumbImgURL as string} alt="ThumbImg" />
                    <DeleteThumbFileButton onClick={deleteThumbImg}>
                        <DeleteOutlined />
                    </DeleteThumbFileButton>
                </PreviewThumbFileBox>
            ) : null}
        </Wrapper>
    );
};

export default Thumbnail;
