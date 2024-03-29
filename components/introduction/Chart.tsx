import ApexChart from 'react-apexcharts';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

const ChartBox = styled.div`
    width: 55%;
    max-width: 56.25rem;
    min-width: 25rem;
    margin: 0 auto;
    text-align: center;
    h2 {
        font-size: 2.5rem;
        margin-top: 0.25em;
        margin-bottom: 0.5em;
        font-weight: bold;
    }
    div {
        text-align: right;
    }
`;

interface ISkillChart {
    skill: '1' | '2';
    changeSkill: (e: RadioChangeEvent) => void;
}

const skillObj = {
    '1': [
        { x: 'HTML', y: 70 },
        { x: 'CSS', y: 55 },
        { x: 'Js[ES6]', y: 65 },
        { x: 'TypeScript', y: 60 },
        { x: 'React', y: 65 },
    ],
    '2': [
        { x: 'Js[ES6]', y: 65 },
        { x: 'Node JS', y: 55 },
        { x: 'Rest Api', y: 65 },
        { x: 'Postgresql', y: 50 },
        { x: 'AWS', y: 55 },
    ],
};

const ApexCharts = ({ skill, changeSkill }: ISkillChart) => {
    return (
        <ChartBox>
            <div style={{ marginBottom: 30 }}>
                <Radio.Group onChange={changeSkill} value={skill}>
                    <Radio style={{ color: 'rgb(70, 35, 0)', fontFamily: 'NanumSquareRoundB, sans-serif' }} value={'1'}>
                        Front End
                    </Radio>
                    <Radio style={{ color: 'rgb(70, 35, 0)', fontFamily: 'NanumSquareRoundB, sans-serif' }} value={'2'}>
                        Back End
                    </Radio>
                </Radio.Group>
            </div>
            <ApexChart
                series={[
                    {
                        data: [...skillObj[skill]],
                    },
                ]}
                type="bar"
                options={{
                    theme: {
                        mode: 'light',
                    },
                    chart: {
                        type: 'bar',
                        toolbar: {
                            show: false,
                        },
                        animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 1000,
                            animateGradually: {
                                enabled: true,
                                delay: 150,
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 200,
                            },
                        },
                    },
                    colors: skill === '1' ? ['rgb(75, 172, 198)'] : ['rgb(69, 226, 145)'],
                    plotOptions: {
                        bar: {
                            borderRadius: 5,
                            horizontal: true,
                            dataLabels: {
                                position: 'top',
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        offsetX: -20,
                        style: {
                            fontSize: '14px',
                            colors: ['rgb(70, 35, 0)'],
                            fontFamily: 'NanumSquareRoundEB',
                        },
                        formatter: function (val) {
                            return val + '%';
                        },
                    },
                    tooltip: { enabled: false },
                    xaxis: {
                        type: 'category',
                        labels: {
                            formatter: function (val) {
                                return val + '%';
                            },
                            style: {
                                fontSize: '13px',
                                fontWeight: 'bold',
                                colors: ['rgb(70, 35, 0)'],
                                // fontFamily: 'NanumSquareRoundB',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        // min: 10,
                        max: 100,

                        labels: {
                            style: {
                                fontSize: '16px',
                                fontWeight: 'bold',
                                colors: ['rgb(70, 35, 0)'],
                                fontFamily: 'NanumSquareRoundEB, sans-serif',
                            },
                        },
                    },
                }}
                height={380}
            />
        </ChartBox>
    );
};

export default ApexCharts;
