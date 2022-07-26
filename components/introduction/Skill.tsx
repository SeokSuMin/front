import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Skills = styled(motion.div)`
    width: 100%;
    height: 18.75rem;
    background-color: #e6f4f1;
    border-radius: 0.625em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* overflow: hidden; */
`;

const DragBox = styled(motion.div)`
    height: 6.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SkillSvg = styled(motion.svg)`
    width: 3.75rem;
    height: 3.75rem;
    margin-right: 0.313em;
    cursor: pointer;
    //
`;

const Skill = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [rerenderFlag, setRerenderFlag] = useState(false);
    useEffect(() => {
        // 드래그 버그때문에 강제 리렌더 한번 더
        setRerenderFlag((prev) => !prev);
    }, []);

    return (
        <>
            {rerenderFlag ? (
                <Skills ref={constraintsRef}>
                    <DragBox>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path
                                fill="rgb(105, 160, 199)"
                                d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"
                            />
                        </SkillSvg>

                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="rgb(40, 98, 233)"
                                d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"
                            />
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="rgb(239, 216, 29)"
                                d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"
                            />
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                        >
                            <rect width="36" height="36" x="6" y="6" fill="rgb(25, 118, 210)"></rect>
                            <polygon
                                fill="#fff"
                                points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
                            ></polygon>
                            <path
                                fill="#fff"
                                d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
                            ></path>
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="rgb(70, 174, 252)"
                                d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
                            />
                        </SkillSvg>
                    </DragBox>
                    <DragBox>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="rgb(239, 216, 29)"
                                d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"
                            />
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            fill="#1A1A1A"
                        >
                            <path
                                fill="#388e3c"
                                d="M17.204 19.122l-4.907 2.715C12.113 21.938 12 22.126 12 22.329v5.433c0 .203.113.39.297.492l4.908 2.717c.183.101.41.101.593 0l4.907-2.717C22.887 28.152 23 27.965 23 27.762v-5.433c0-.203-.113-.39-.297-.492l-4.906-2.715c-.092-.051-.195-.076-.297-.076-.103 0-.205.025-.297.076M42.451 24.013l-.818.452c-.031.017-.049.048-.049.082v.906c0 .034.019.065.049.082l.818.453c.031.017.068.017.099 0l.818-.453c.03-.017.049-.048.049-.082v-.906c0-.034-.019-.065-.05-.082l-.818-.452C42.534 24.004 42.517 24 42.5 24S42.466 24.004 42.451 24.013"
                            ></path>
                            <path
                                fill="#37474f"
                                d="M35.751,13.364l-2.389-1.333c-0.075-0.042-0.167-0.041-0.241,0.003 c-0.074,0.044-0.12,0.123-0.12,0.209L33,20.295l-2.203-1.219C30.705,19.025,30.602,19,30.5,19c-0.102,0-0.205,0.025-0.297,0.076 h0.001l-4.907,2.715C25.113,21.892,25,22.08,25,22.282v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C35.887,28.106,36,27.918,36,27.715V13.788C36,13.612,35.904,13.45,35.751,13.364z M32.866,26.458l-2.23,1.235c-0.083,0.046-0.186,0.046-0.269,0l-2.231-1.235C28.051,26.412,28,26.326,28,26.234v-2.47 c0-0.092,0.051-0.177,0.135-0.224l2.231-1.234h-0.001c0.042-0.023,0.088-0.034,0.135-0.034c0.047,0,0.093,0.012,0.135,0.034 l2.23,1.234C32.949,23.587,33,23.673,33,23.765v2.47C33,26.326,32.949,26.412,32.866,26.458z"
                            ></path>
                            <path
                                fill="#2e7d32"
                                d="M17.204,19.122L12,27.762c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0L23,22.329c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"
                            ></path>
                            <path
                                fill="#4caf50"
                                d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329l5.204,8.642 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762l-5.203-8.64c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"
                            ></path>
                            <path
                                fill="#37474f"
                                d="M47.703 21.791l-4.906-2.715C42.705 19.025 42.602 19 42.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C37.114 21.892 37 22.084 37 22.294v5.411c0 .209.114.402.297.503l4.908 2.717c.184.102.409.102.593 0l2.263-1.253c.207-.115.206-.412-.002-.526l-4.924-2.687C40.052 26.412 40 26.325 40 26.231v-2.466c0-.092.05-.177.13-.221l2.235-1.236h-.001c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237c.08.044.13.129.13.221v2.012c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393c.148-.086.24-.245.24-.417v-1.88C48 22.085 47.886 21.892 47.703 21.791zM10.703 21.791l-4.906-2.715C5.705 19.025 5.602 19 5.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C.114 21.892 0 22.084 0 22.294v7.465c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393C2.909 28.488 3 28.329 3 28.157v-4.393c0-.092.05-.177.13-.221l2.235-1.236H5.365c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237C7.95 23.588 8 23.673 8 23.765v4.393c0 .172.091.331.24.417l2.398 1.393c.075.043.167.043.242.001C10.954 29.925 11 29.845 11 29.759v-7.464C11 22.085 10.886 21.892 10.703 21.791z"
                            ></path>
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 122.88 100.33"
                        >
                            <path d="M102.79,7.11l2.59,3.41c0.68,0.9,0.51,2.19-0.39,2.87l-2.75,2.09c0.5,1.33,0.82,2.75,0.95,4.2l3.13,0.43 c1.12,0.15,1.9,1.19,1.75,2.31l-0.58,4.25c-0.15,1.12-1.19,1.91-2.31,1.75l-3.42-0.47c-0.61,1.33-1.39,2.55-2.31,3.64l1.92,2.52 c0.68,0.9,0.5,2.19-0.4,2.87l-3.41,2.59c-0.9,0.68-2.19,0.5-2.87-0.39l-2.09-2.75c-1.34,0.5-2.75,0.82-4.21,0.95l-0.43,3.13 c-0.15,1.12-1.19,1.9-2.31,1.75l-4.25-0.58c-1.12-0.15-1.9-1.19-1.75-2.31l0.47-3.42c-1.32-0.61-2.55-1.39-3.64-2.3l-2.52,1.91 c-0.9,0.68-2.19,0.51-2.87-0.39l-2.59-3.41c-0.68-0.9-0.51-2.19,0.39-2.87l2.75-2.09c-0.5-1.34-0.82-2.75-0.95-4.2l-3.13-0.43 c-1.12-0.15-1.91-1.19-1.75-2.31l0.58-4.25c0.16-1.12,1.19-1.9,2.31-1.75l3.42,0.47c0.61-1.32,1.39-2.55,2.3-3.64l-1.91-2.52 C71.83,7.28,72,5.99,72.9,5.31l3.41-2.59c0.9-0.68,2.19-0.51,2.87,0.39l2.09,2.75c1.33-0.5,2.75-0.82,4.2-0.95l0.43-3.13 c0.15-1.12,1.19-1.91,2.31-1.76l4.25,0.58c1.12,0.15,1.91,1.19,1.75,2.31l-0.47,3.42c1.33,0.61,2.55,1.39,3.65,2.31l2.52-1.91 C100.81,6.04,102.1,6.21,102.79,7.11L102.79,7.11L102.79,7.11z M29.67,67.12v-16.5h8.5c1.58,0,2.78,0.13,3.61,0.41 c0.83,0.27,1.51,0.77,2.01,1.5c0.51,0.74,0.77,1.63,0.77,2.68c0,0.91-0.2,1.71-0.59,2.37c-0.39,0.67-0.93,1.21-1.61,1.62 c-0.43,0.26-1.03,0.48-1.79,0.65c0.61,0.21,1.05,0.4,1.32,0.61c0.19,0.14,0.46,0.43,0.81,0.87c0.35,0.44,0.59,0.79,0.71,1.03 l2.48,4.77h-5.76l-2.72-5.03c-0.35-0.65-0.65-1.08-0.92-1.27c-0.37-0.25-0.79-0.38-1.25-0.38h-0.45v6.68H29.67L29.67,67.12z M47.65,95.85h-9.52l-1.37,4.48h-8.58l10.23-27.19h9.2l10.19,27.19h-8.8L47.65,95.85L47.65,95.85z M45.87,89.96l-2.97-9.78 l-2.98,9.78H45.87L45.87,89.96z M59.78,73.14h13.98c3.05,0,5.33,0.72,6.84,2.17c1.51,1.45,2.27,3.52,2.27,6.19 c0,2.75-0.83,4.9-2.48,6.45c-1.65,1.55-4.18,2.32-7.57,2.32h-4.61v10.06h-8.43V73.14L59.78,73.14z M68.21,84.76h2.07 c1.63,0,2.78-0.28,3.44-0.85c0.66-0.56,0.99-1.29,0.99-2.16c0-0.85-0.29-1.58-0.86-2.17c-0.57-0.59-1.65-0.89-3.23-0.89h-2.41 V84.76L68.21,84.76z M86.27,73.14h8.43v27.19h-8.43V73.14L86.27,73.14z M34.79,57.32h2.15c0.23,0,0.68-0.08,1.35-0.23 c0.34-0.07,0.62-0.24,0.83-0.52c0.22-0.28,0.32-0.6,0.32-0.96c0-0.53-0.17-0.95-0.51-1.23c-0.34-0.29-0.97-0.43-1.9-0.43h-2.24 V57.32L34.79,57.32z M46.87,50.62h13.65v3.52h-8.53v2.63h7.91v3.36h-7.91v3.25h8.78v3.73h-13.9V50.62L46.87,50.62z M61.98,61.66 l4.84-0.3c0.1,0.79,0.32,1.38,0.64,1.79c0.53,0.66,1.28,1,2.25,1c0.72,0,1.29-0.17,1.68-0.51c0.39-0.34,0.59-0.74,0.59-1.19 c0-0.43-0.19-0.81-0.56-1.15c-0.37-0.34-1.24-0.65-2.61-0.96c-2.23-0.5-3.82-1.17-4.78-2c-0.96-0.83-1.44-1.89-1.44-3.18 c0-0.85,0.25-1.65,0.74-2.4c0.49-0.75,1.23-1.35,2.22-1.78c0.99-0.43,2.34-0.64,4.06-0.64c2.11,0,3.71,0.39,4.82,1.18 c1.1,0.79,1.76,2.03,1.97,3.75l-4.79,0.29c-0.13-0.75-0.4-1.3-0.8-1.63c-0.41-0.34-0.98-0.51-1.69-0.51 c-0.59,0-1.04,0.13-1.34,0.38c-0.3,0.25-0.45,0.56-0.45,0.92c0,0.26,0.13,0.49,0.37,0.71c0.24,0.21,0.8,0.42,1.7,0.61 c2.23,0.48,3.83,0.97,4.79,1.46c0.96,0.49,1.67,1.1,2.1,1.83c0.44,0.72,0.66,1.54,0.66,2.44c0,1.06-0.29,2.03-0.88,2.92 c-0.58,0.89-1.4,1.57-2.45,2.03c-1.05,0.46-2.37,0.69-3.97,0.69c-2.8,0-4.75-0.54-5.83-1.62C62.74,64.69,62.13,63.32,61.98,61.66 L61.98,61.66z M77.69,50.62h15.51v4.08H88v12.42H82.9V54.7h-5.21V50.62L77.69,50.62z M60.53,11.46c-1.83-0.14-3.68-0.12-5.51,0.06 c-5.63,0.54-11.1,2.59-15.62,6.1c-5.23,4.05-9.2,10.11-10.73,18.14l-0.48,2.51l-2.5,0.44c-2.45,0.43-4.64,1.02-6.56,1.77 c-1.86,0.72-3.52,1.61-4.97,2.66c-1.16,0.84-2.16,1.78-3.01,2.8c-2.63,3.15-3.85,7.1-3.82,11.1c0.03,4.06,1.35,8.16,3.79,11.53 c0.91,1.25,1.96,2.4,3.16,3.4c1.22,1.01,2.59,1.85,4.13,2.48c0.87,0.36,1.8,0.66,2.77,0.9v7.49c-2-0.36-3.84-0.9-5.56-1.61 c-2.27-0.94-4.28-2.15-6.05-3.63c-1.68-1.4-3.15-2.99-4.4-4.72C1.84,68.28,0.04,62.66,0,57.06c-0.04-5.66,1.72-11.29,5.52-15.85 c1.23-1.48,2.68-2.84,4.34-4.04c1.93-1.4,4.14-2.58,6.64-3.55c1.72-0.67,3.56-1.23,5.5-1.68c2.2-8.74,6.89-15.47,12.92-20.14 c5.64-4.37,12.43-6.92,19.42-7.59c3.67-0.35,7.39-0.19,11.03,0.49c-0.08,0.33-0.15,0.66-0.19,1l-0.01,0.06 c-0.07,0.57-0.1,1.14-0.07,1.72c-0.77,0.3-1.49,0.71-2.14,1.21l-0.03,0.02C61.96,9.44,61.14,10.38,60.53,11.46L60.53,11.46z M113.44,30.66c0.56,0.51,1.1,1.04,1.63,1.61c1.07,1.15,2.08,2.45,3.03,3.9c3.2,4.92,4.84,11.49,4.77,17.92 c-0.07,6.31-1.77,12.59-5.25,17.21c-2.27,3.01-5.18,5.47-8.67,7.42c-2.39,1.34-5.08,2.45-8.01,3.35v-7.75 c1.58-0.59,3.05-1.25,4.4-2c2.63-1.47,4.78-3.26,6.39-5.41c2.5-3.33,3.73-8.04,3.78-12.87c0.06-5.07-1.18-10.16-3.59-13.86 c-0.69-1.07-1.45-2.03-2.25-2.89c-0.31-0.33-0.62-0.64-0.94-0.94c0.05-0.5,0.07-1.01,0.04-1.52c0.77-0.3,1.49-0.71,2.14-1.21 l0.03-0.02C111.97,32.81,112.83,31.81,113.44,30.66L113.44,30.66z M88.08,12.8c4.61,0.63,7.83,4.88,7.2,9.49 c-0.63,4.61-4.88,7.84-9.49,7.21c-4.61-0.63-7.84-4.88-7.2-9.49C79.23,15.4,83.47,12.17,88.08,12.8L88.08,12.8L88.08,12.8z"></path>
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="#000000"
                        >
                            <path
                                fill="#fff"
                                d="M44.083,29.79c-0.183-0.829-0.935-1.796-2.452-1.796c-0.31,0-0.649,0.039-1.035,0.119c-0.708,0.146-1.311,0.217-1.842,0.241c4.133-7.04,6.816-16.819,4.159-20.214c-3.501-4.473-8.214-5.141-10.711-5.141L31.967,3c-0.929,0.015-1.893,0.129-2.863,0.339l-3.583,0.774C25.033,4.052,24.536,4.009,24.018,4l-0.03,0l-0.016,0l-0.152-0.001c-1.593,0-3.046,0.338-4.341,0.973l-1.251-0.493c-1.72-0.678-4.308-1.485-6.868-1.485c-0.144,0-0.287,0.003-0.431,0.008C8.407,3.093,6.241,4.05,4.664,5.769C2.696,7.915,1.8,11.054,2.003,15.1C2.013,15.309,4.461,36,11.4,36h0.025l0.064-0.001c0.901-0.022,1.76-0.384,2.563-1.077c0.613,0.46,1.406,0.732,2.145,0.84c0.488,0.115,1.366,0.278,2.418,0.278c1.284,0,2.442-0.263,3.44-0.738c-0.001,0.88-0.006,1.994-0.016,3.418l-0.001,0.075l0.005,0.075c0.097,1.419,0.342,2.698,0.711,3.701c1.051,2.859,2.866,4.434,5.111,4.434c0.093,0,0.188-0.003,0.284-0.009c1.846-0.114,3.717-1.151,5.004-2.772c1.393-1.755,1.715-3.607,1.839-5.026L35,39.111v-0.088v-4.079l0.103,0.01l0.436,0.038l0.042,0.004l0.042,0.002c0.124,0.006,0.252,0.008,0.381,0.008c1.507,0,3.362-0.391,4.616-0.974C41.819,33.476,44.559,31.948,44.083,29.79z"
                            ></path>
                            <path
                                fill="#0277bd"
                                d="M33,34c0-0.205,0.012-0.376,0.018-0.565C33.008,33.184,33,33,33,33s0.012-0.009,0.032-0.022c0.149-2.673,0.886-3.703,1.675-4.29c-0.11-0.153-0.237-0.318-0.356-0.475c-0.333-0.437-0.748-0.979-1.192-1.674l-0.082-0.158c-0.067-0.164-0.229-0.447-0.435-0.819c-1.183-2.14-3.645-6.592-1.96-9.404c0.738-1.232,2.122-1.942,4.121-2.117C33.986,11.718,30.925,6.115,23.985,6c-0.002,0-0.004,0-0.006,0c-6.041-0.098-8.026,5.392-8.672,8.672c0.89-0.377,1.906-0.606,2.836-0.606c0.014,0,0.029,0,0.043,0c2.29,0.017,3.865,1.239,4.323,3.354c0.335,1.552,0.496,2.91,0.492,4.153c-0.01,2.719-0.558,4.149-1.042,5.411l-0.154,0.408c-0.124,0.334-0.255,0.645-0.379,0.937c-0.126,0.298-0.237,0.563-0.318,0.802c0.484,0.11,0.864,0.265,1.125,0.38l0.151,0.066c0.047,0.02,0.094,0.043,0.137,0.069c0.848,0.516,1.376,1.309,1.489,2.233c0.061,0.498,0.051,3.893,0.03,6.855c0.087,1.285,0.305,2.364,0.593,3.146c0.409,1.114,1.431,3.241,3.394,3.119c1.37-0.085,2.687-0.919,3.561-2.019c0.938-1.181,1.284-2.487,1.414-3.958V34z"
                            ></path>
                            <path
                                fill="#0277bd"
                                d="M15.114 28.917c-1.613-1.683-2.399-3.947-2.104-6.056.285-2.035.124-4.027.037-5.098-.029-.357-.048-.623-.047-.77 0-.008.002-.015.003-.023 0-.004-.002-.007-.002-.011.121-3.021 1.286-7.787 4.493-10.62C15.932 5.724 13.388 4.913 11 5 7.258 5.136 3.636 7.724 4 15c.137 2.73 3.222 19.103 7.44 19 .603-.015 1.229-.402 1.872-1.176 1.017-1.223 2.005-2.332 2.708-3.104C15.705 29.481 15.401 29.217 15.114 28.917zM37.023 14.731c.015.154.002.286-.022.408.031.92-.068 1.813-.169 2.677-.074.636-.15 1.293-.171 1.952-.021.645.07 1.282.166 1.956.225 1.578.459 3.359-.765 5.437.225.296.423.571.581.837 4.61-7.475 6.468-16.361 4.695-18.626C38.655 5.944 34.941 4.952 31.999 5c-.921.015-1.758.139-2.473.294C34.602 7.754 36.863 13.026 37.023 14.731zM41 30.071c-2.665.55-3.947.257-4.569-.126-.1.072-.2.133-.293.19-.372.225-.961.583-1.105 2.782.083.016.156.025.246.044L35.714 33c1.32.06 3.049-.31 4.063-.781C41.962 31.205 43.153 29.627 41 30.071zM22.023 32.119c-.037-.298-.198-.539-.492-.732l-.108-.047C21.062 31.181 20.653 31 20 31h-.004c-.127.01-.253.019-.38.019-.052 0-.103-.007-.155-.009-.474.365-1.148.647-2.816.99-2.98.759-1.221 1.655-.078 1.794 1.106.277 3.735.614 5.481-.809C22.043 32.537 22.035 32.229 22.023 32.119z"
                            ></path>
                            <path
                                fill="#0277bd"
                                d="M20.681 18.501c-.292.302-.753.566-1.262.484-.828-.134-1.463-1.133-1.417-1.508h0c.044-.374.751-.569 1.578-.435.287.047.548.128.768.228-.32-.688-.899-1.085-1.782-1.182-1.565-.174-3.226.644-3.56 1.097.007.11.02.251.033.417.093 1.147.265 3.284-.05 5.537-.208 1.485.393 3.169 1.567 4.395.757.79 1.641 1.29 2.513 1.438.111-.478.309-.944.513-1.425.113-.265.233-.547.346-.852l.162-.427c.443-1.155.9-2.35.909-4.703C21.003 20.66 20.892 19.627 20.681 18.501zM34.847 22.007c-.104-.729-.211-1.484-.185-2.303.023-.742.105-1.442.184-2.119.062-.533.11-1.045.138-1.55-1.289.107-2.145.479-2.551 1.108.168-.057.358-.102.568-.129.892-.116 1.543.141 1.618.637.055.363-.253.705-.388.836-.277.269-.626.442-.981.488-.064.008-.129.012-.192.012-.353 0-.69-.121-.949-.3.112 1.973 1.567 4.612 2.283 5.907.153.277.271.498.369.688C35.154 24.163 35.009 23.143 34.847 22.007z"
                            ></path>
                        </SkillSvg>
                        <SkillSvg
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={1}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 333334 199332"
                        >
                            <path d="M93937 72393c0 4102 443 7428 1219 9867 887 2439 1996 5100 3548 7982 554 887 776 1774 776 2550 0 1109-665 2217-2106 3326l-6985 4656c-998 665-1995 998-2882 998-1109 0-2217-554-3326-1552-1552-1663-2882-3437-3991-5211-1109-1885-2217-3991-3437-6541-8648 10200-19512 15299-32594 15299-9312 0-16740-2661-22172-7982-5432-5322-8204-12417-8204-21286 0-9424 3326-17073 10089-22838s15743-8647 27161-8647c3769 0 7650 332 11752 887 4102 554 8315 1441 12749 2439v-8093c0-8426-1774-14301-5211-17738-3548-3437-9534-5100-18071-5100-3880 0-7871 443-11973 1441s-8093 2217-11973 3769c-1774 776-3104 1219-3880 1441s-1330 332-1774 332c-1552 0-2328-1109-2328-3437v-5432c0-1774 222-3104 776-3880s1552-1552 3104-2328c3880-1996 8537-3659 13969-4989C43606 885 49370 220 55468 220c13193 0 22838 2993 29046 8980 6098 5987 9202 15077 9202 27272v35920h222zM48926 89244c3659 0 7428-665 11419-1995s7539-3769 10532-7095c1774-2106 3104-4435 3770-7095 665-2661 1108-5876 1108-9645v-4656c-3215-776-6652-1441-10199-1885-3548-443-6984-665-10421-665-7428 0-12860 1441-16519 4435-3659 2993-5432 7206-5432 12749 0 5211 1330 9091 4102 11751 2661 2772 6541 4102 11641 4102zm89023 11973c-1996 0-3326-332-4213-1109-887-665-1663-2217-2328-4324l-26053-85697c-665-2217-998-3658-998-4434 0-1774 887-2772 2661-2772h10865c2106 0 3548 333 4324 1109 887 665 1552 2217 2217 4324l18625 73391 17295-73391c554-2217 1219-3659 2106-4324s2439-1109 4435-1109h8869c2106 0 3548 333 4435 1109 887 665 1663 2217 2106 4324l17516 74278 19180-74278c665-2217 1441-3659 2217-4324 887-665 2328-1109 4324-1109h10310c1774 0 2772 887 2772 2772 0 554-111 1109-222 1774s-333 1552-776 2772l-26718 85697c-665 2217-1441 3658-2328 4324-887 665-2328 1109-4213 1109h-9534c-2107 0-3548-333-4435-1109s-1663-2217-2106-4435l-17184-71507-17073 71396c-554 2217-1220 3658-2107 4434s-2439 1109-4434 1109h-9534zm142459 2993c-5765 0-11530-665-17073-1995s-9867-2772-12749-4435c-1774-998-2993-2106-3437-3104-443-998-665-2106-665-3104v-5654c0-2328 887-3437 2550-3437 665 0 1330 111 1995 333s1663 665 2772 1109c3769 1663 7871 2993 12195 3880 4435 887 8758 1330 13193 1330 6984 0 12417-1220 16186-3659s5765-5987 5765-10532c0-3104-998-5654-2993-7760-1996-2107-5765-3991-11197-5765l-16075-4989c-8093-2550-14080-6319-17738-11308-3658-4878-5543-10310-5543-16075 0-4656 998-8758 2993-12306s4656-6652 7982-9091c3326-2550 7095-4434 11530-5765S279190-2 284068-2c2439 0 4989 111 7428 443 2550 333 4878 776 7206 1219 2217 554 4324 1109 6319 1774s3548 1330 4656 1996c1552 887 2661 1774 3326 2771 665 887 998 2107 998 3659v5211c0 2328-887 3548-2550 3548-887 0-2328-444-4213-1331-6319-2882-13415-4324-21286-4324-6319 0-11308 998-14745 3104s-5211 5321-5211 9867c0 3104 1109 5765 3326 7871s6319 4213 12195 6097l15743 4989c7982 2550 13747 6098 17184 10643s5100 9756 5100 15521c0 4767-998 9091-2882 12860-1996 3770-4656 7095-8093 9756-3437 2771-7539 4767-12306 6208-4989 1552-10199 2328-15854 2328z" />
                            <path
                                fill="#f90"
                                d="M301362 158091c-36474 26940-89467 41241-135031 41241-63858 0-121395-23614-164854-62859-3437-3104-332-7317 3770-4878 47006 27272 104988 43791 164964 43791 40465 0 84921-8426 125830-25721 6097-2772 11308 3991 5321 8426z"
                            />
                            <path
                                fill="#f90"
                                d="M316550 140796c-4656-5987-30820-2883-42682-1441-3548 443-4102-2661-887-4989 20842-14634 55099-10421 59090-5543 3991 4989-1109 39246-20620 55653-2993 2550-5876 1220-4545-2106 4435-10976 14301-35698 9645-41574z"
                            />
                        </SkillSvg>
                    </DragBox>
                </Skills>
            ) : null}
        </>
    );
};

export default Skill;
