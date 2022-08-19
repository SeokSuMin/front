import React, { memo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import { Button } from 'antd';

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
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
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
    'list',
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
    // contentValue: string;
    // changeQuill: (content: string) => void;
    // setContentValue: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = ({ quillRef }: IQuillEditorProps) => {
    return (
        <>
            <ReactQuill
                ref={quillRef}
                placeholder="write Text"
                // value={contentValue}
                defaultValue={'test value'}
                theme="snow"
                modules={modules}
                formats={formats}
                // onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
            ></ReactQuill>
        </>
    );
};

export default QuillEditor;
