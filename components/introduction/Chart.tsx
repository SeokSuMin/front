import ApexChart from 'react-apexcharts';
import { Radio, RadioChangeEvent } from 'antd';

interface ISkillChart {
    skill: number;
    changeSkill: (e: RadioChangeEvent) => void;
}

const skillObj = {
    '1': [
        { x: 'HTML', y: 75 },
        { x: 'CSS', y: 65 },
        { x: 'JavaScript', y: 80 },
        { x: 'TypeScript', y: 70 },
        { x: 'React', y: 75 },
    ],
    '2': [
        { x: 'JavaScript', y: 80 },
        { x: 'Node JS', y: 70 },
        { x: 'Rest Api', y: 80 },
        { x: 'Postgresql', y: 60 },
        { x: 'AWS', y: 75 },
    ],
};

const ApexCharts = ({ skill, changeSkill }: ISkillChart) => {
    return (
        <>
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
        </>
    );
};

export default ApexCharts;
