import * as Cheerio from 'cheerio';

const mockOrgTreeList = [
    {
        label: 'Liberty Health',
        id: '1',
        branches: [
            {
                label: 'Pacific Northwest',
                id: '2',
                branches: [
                    {
                        label: 'East Portland Clinic',
                        id: '3',
                        branches: [],
                    },
                    {
                        label: 'Beaverton / Tigard',
                        id: '4',
                        branches: [],
                    },
                    {
                        label: 'Lake Oswego Regency',
                        id: '5',
                        branches: [],
                    },
                ],
            },
            {
                label: 'Alaska',
                id: '6',
                branches: [],
            },
        ],
    },
    {
        label: 'Northstar Alliance',
        id: '7',
        branches: [
            {
                label: 'Chicago',
                id: '8',
                branches: [
                    {
                        label: 'Southwest Region',
                        id: '9',
                        branches: [
                            {
                                label: 'Desplains',
                                id: '10',
                                branches: [],
                            },
                            {
                                label: 'Oak Lawn',
                                id: '11',
                                branches: [],
                            },
                        ],
                    },
                    {
                        label: 'Northwest Region',
                        id: '12',
                        branches: [
                            {
                                label: 'East Morland',
                                id: '13',
                                branches: [],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'New York',
                id: '14',
                branches: [
                    {
                        label: 'Manhattan',
                        id: '15',
                        branches: [],
                    },
                    {
                        label: 'Queens',
                        id: '16',
                        branches: [],
                    },
                    {
                        label: '5372 Arlington Heights',
                        id: '17',
                        branches: [],
                    },
                    {
                        label: 'The Earlmore Institute of Health',
                        id: '18',
                        branches: [],
                    },
                ],
            },
        ],
    },
];

function getParamMap(queryString) {
    const splited = queryString.replace('?', '').split(/[=?&]/);
    const param = {};
    for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i];
    }
    return param;
}

// 급여 합계를 구해주는 함수
function sumSalaries(department) {
    if (Array.isArray(department)) {
        // 첫 번째 경우
        return department.reduce((prev, current) => prev + current.salary, 0); // 배열의 요소를 합함
    } else {
        // 두 번째 경우
        let sum = 0;
        for (const subdep of Object.values(department)) {
            const temp = sumSalaries(subdep);
            console.log('temp', temp);
            sum = sum + temp;
            console.log('sum', sum);
        }
        return sum;
    }
}

function test() {
    try {
        const $ = Cheerio.load(
            `<div id="quillContent"><p><img src="http://localhost:3005/8435977c12e741fa98018e92d6d95481/1662896052367vdf2Q.png" width="821" style="cursor: nesw-resize;"></p><p>안녕하세요~~</p><span>이러나 저러나 똑같네요~~~~</span></div>`,
        );
        console.log($);
    } catch (e) {
        console.log(e);
    }
}
test();
