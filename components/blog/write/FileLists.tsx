import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import path from 'path';
import React from 'react';
import styled from 'styled-components';
import { imgExtFormat } from '../../../config';
import { useAppSelector } from '../../../store/hooks';

const Lable = styled.label`
    width: 11%;
    text-align: left;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 0.725em;
`;

const FileListBox = styled.div`
    width: 100%;
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
    span.percentText {
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
    deleteFile: (type: string, fileName: string | number) => void;
}

const FileLists = ({ deleteFile }: IFileListsProps) => {
    const router = useRouter();
    const detailBoard = useAppSelector((state) => state.boardData);
    const { uploadFileInfo } = useAppSelector((state) => state.fileProgress);
    return (
        <>
            {detailBoard?.board_files?.length || uploadFileInfo.length ? (
                <FileListBox>
                    <Lable>파일목록</Lable>
                    <FileList>
                        {/* 게시글 수정에만 나타남 */}
                        {router?.query?.mode === 'modify'
                            ? detailBoard?.board_files?.map((file) => {
                                  const extName = path.extname(file.name);
                                  // 이미지 파일이 아닌 것 만
                                  if (!imgExtFormat.includes(extName.toLocaleLowerCase())) {
                                      return (
                                          <FileBox key={file.file_id}>
                                              <Files>
                                                  <span>
                                                      <PaperClipOutlined />
                                                      {file.name}
                                                  </span>
                                                  <span className="delete">
                                                      <DeleteOutlined
                                                          onClick={() => deleteFile('board', file.file_id)}
                                                      />
                                                  </span>
                                                  <Progress style={{ width: '100%' }}></Progress>
                                              </Files>
                                              <span className="percentText">업로드된 파일</span>
                                          </FileBox>
                                      );
                                  }
                              })
                            : null}
                        {/* 실제 파일 업로드 정보 */}
                        {uploadFileInfo?.map((file) => {
                            return (
                                <FileBox key={file.fileId}>
                                    <Files>
                                        <span>
                                            <PaperClipOutlined />
                                            {file.fileName}
                                        </span>
                                        <span className="delete">
                                            <DeleteOutlined onClick={() => deleteFile('new', file.fileName)} />
                                        </span>
                                        <Progress style={{ width: file.progress + '%' }}></Progress>
                                    </Files>
                                    {file.progress > 0 ? <span className="percentText">{file.progress}%</span> : null}
                                </FileBox>
                            );
                        })}
                    </FileList>
                </FileListBox>
            ) : null}
        </>
    );
};

export default FileLists;
