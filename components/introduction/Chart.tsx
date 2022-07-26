import ApexChart from 'react-apexcharts';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

const ChartBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 12.5em;
    padding: 0.938em;
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
    skill: number;
    changeSkill: (e: RadioChangeEvent) => void;
}

const skillObj = {
    '1': [
        { x: 'HTML', y: 70 },
        { x: 'CSS', y: 55 },
        { x: 'Js[ES6]', y: 60 },
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
            <h2>Skill Level</h2>
            <div>
                <Radio.Group onChange={changeSkill} value={skill}>
                    <Radio value={1}>Front End</Radio>
                    <Radio value={2}>Back End</Radio>
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
                    colors: skill === 1 ? ['#26A0FC'] : ['#26e7a6'],
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
                        offsetX: -10,
                        style: {
                            fontSize: '13px',
                            colors: ['#fff'],
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
                        },
                    },
                    yaxis: {
                        show: true,
                        // min: 10,
                        max: 100,

                        labels: {
                            style: {
                                fontSize: '12px',
                                fontWeight: 'bold',
                            },
                        },
                    },
                }}
                height={300}
            />
        </ChartBox>
    );
};

export default ApexCharts;
