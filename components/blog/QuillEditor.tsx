import React, { memo, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import dayjs from 'dayjs';
import { useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/router';
import axios from 'axios';
import { fileBackUrl } from '../../config';
import styled from 'styled-components';
import { Input } from 'antd';
import * as Cheerio from 'cheerio';

const { Search } = Input;

const Delta = Quill.import('delta');

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.8em;
    .ant-input-group-wrapper {
        width: 15%;
        min-width: 6.25em;
    }
`;

const Lable = styled.label`
    width: 10%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
`;

//Text direction
Quill.register(Quill.import('attributors/style/direction'), true);
//Alignment
Quill.register(Quill.import('attributors/style/align'), true);
//FontSize
Quill.register(Quill.import('attributors/style/size'), true);
Quill.register(Quill.import('attributors/style/font'), true);
Quill.register(Quill.import('attributors/style/color'), true);
Quill.register('modules/ImageResize', ImageResize);

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['code-block'],
    // ['blockquote', 'code-block'],
    // [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    // 'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
    'code-block',
];

const modules = {
    toolbar: {
        container: toolbarOptions,
    },
    ImageResize: {
        parchment: Quill.import('parchment'),
    },
};

interface IQuillEditorProps {
    quillRef: React.MutableRefObject<any>;
    uuid: string;
    // contentValue: string;
    // changeQuill: (content: string) => void;
    // setContentValue: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = ({ quillRef, uuid }: IQuillEditorProps) => {
    const router = useRouter();
    const detailBoard = useAppSelector((state) => state.boardData);
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        if (router?.query?.mode === 'modify') {
            setContent(detailBoard?.content ? detailBoard?.content : '');
        } else {
            setContent('');
        }
    }, [router.query.mode, detailBoard?.content]);

    const changeImgSize = (size: string) => {
        const $ = Cheerio.load(quillRef.current.state.value);
        const allTags = Array.from($('html').find('*'));
        allTags.map((tag) => {
            if ($(tag).prop('tagName') === 'IMG') {
                $(tag).prop('width', size + 'px');
            }
        });
        setContent($.html());
    };

    return (
        <>
            <TitleBox>
                <Lable>이미지크기</Lable>
                <Search placeholder="ex) 300" enterButton="적용" size="small" onSearch={changeImgSize} />
            </TitleBox>
            <ReactQuill
                // content를 키로 지정해 모드 변경시 내용을 초기화한다.
                key={content}
                ref={quillRef}
                placeholder="write Text"
                // value={content}
                defaultValue={content as string}
                theme="snow"
                modules={{
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            image: async function () {
                                const fileInput = document.createElement('input');
                                fileInput.setAttribute('type', 'file');
                                fileInput.setAttribute('multiple', 'multiple');
                                fileInput.setAttribute('accept', 'image/*');
                                fileInput.addEventListener('change', async () => {
                                    if (fileInput.files !== null) {
                                        const formData = new FormData();
                                        formData.append('boardId', uuid);
                                        for (const file of fileInput.files) {
                                            formData.append('file', file);
                                        }

                                        const response = await axios.post('/blog/uploadBoardFile', formData);
                                        const fileNames = response.data.fileNames as string[];
                                        for (const fileName of fileNames) {
                                            const range = (this as any).quill.getSelection(true);
                                            (this as any).quill.updateContents(
                                                new Delta()
                                                    .retain(range.index)
                                                    .delete(range.length)
                                                    .insert({
                                                        image: `${fileBackUrl}${uuid}/${fileName}`,
                                                    }),
                                            );
                                            (this as any).quill.setSelection(range.index + 1);
                                        }
                                        fileInput.value = '';
                                    }
                                });
                                fileInput.click();
                            },
                        },
                    },
                    ImageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize', 'Toolbar'],
                    },
                }}
                formats={formats}
                // onChange={(content, delta, source, editor) => setContent(editor.getHTML())}
            ></ReactQuill>
        </>
    );
};

export default QuillEditor;
