import Mock from 'mockjs';

Mock.mock(/\/person\/git\/list/, 'get', {
    "data|20-30": [{
        "name": 'Error in data(): ReferenceError: xxx is not defined',
        "description": '最大的可能原因是data()中存在实例没有使用的数据',
        "method": '删除即可',
        "grade|1-5": 0,
        "createTime": '@date("yyyy-MM-dd")',
    }],
    'total|100-200': 0,
})

// export default function(mock) {
//     mock.onPost('http://192.168.158.124/person/git/list').reply(() => {
//       const data = [
//         200,
//         Mock.mock({
//           data: {
//             'list| 20-30': [
//                 {
//                     name: 'Error in data(): ReferenceError: xxx is not defined',
//                     description: '最大的可能原因是data()中存在实例没有使用的数据',
//                     method: '删除即可',
//                     'grade | 1-5': 0,
//                     createTime: '@date("yyyy-MM-dd")',
//                 },
//             ],
//           },
//           message: '',
//           status: 0,
//         }),
//       ];
//       console.warn('/user/login mock:\n', data);
//       return data;
//     })
// }





// // let data = []

// // for (let i = 0; i < 2000; i++) {
// //     data.push({
// //         indexCode: (i) + '' + Math.random(0, 1), //  指标编码
// //         labelCode: `labelCode${i + Math.random(0, 1)}`, //  品种代码
// //         breedName: `breedName${i + Math.random(0, 1)}`, //  品种名称
// //         publishTime: `publishTime${i + Math.random(0, 1)}`, //  更新时间
// //         lastPrice: `lastPrice${i + Math.random(0, 1)}`, //  最新价格
// //         changeRate: `changeRate${i + Math.random(0, 1)}`, //  涨跌幅
// //         change1: `change1${i + Math.random(0, 1)}`, //  涨跌
// //         highPrice: `highPrice${i + Math.random(0, 1)}`, //  最高价
// //         lowPrice: `lowPrice${i + Math.random(0, 1)}`, //  最低价
// //         lastClose: `lastClose${i + Math.random(0, 1)}`, //  昨日收盘价
// //         mqShortName: `mqShortName${i + Math.random(0, 1)}`, //  材质简称
// //         scShortName: `scShortName${i + Math.random(0, 1)}`, //  规格简称
// //         cpShortName: `cpShortName${i + Math.random(0, 1)}`, //  厂家
// //         areaShortName: `areaShortName${i + Math.random(0, 1)}`, //  产地
// //         marketShortName: `marketShortName${i + Math.random(0, 1)}`, //  市场
// //     })
// // }

// // export const mockData = data



// import Mock from 'mockjs';

// const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档


// Mock.mock(/\/global/, 'get', {
//     "data|10": [{
//         "key": "@increment",
//         "area": Random.region(),
//         "add|0-1000": 1,
//         "newDie|0-1000": 1,
//         "now|0-1000": 1,
//         "total|0-1000": 1,
//         "cure|0-1000": 1,
//         "die|0-1000": 1,
//     }]
// })

// Mock.mock(/\/land/, 'get', {
//     "data|10": [{
//         "key": "@increment",
//         "area": Random.region(),
//         "add|0-1000": 1,
//         "newLocal|0-1000": 1,
//         "asymptomatic|0-1000": 1,
//         "out|0-1000": 1,
//         "now|0-1000": 1,
//     }]
// })

// Mock.mock(/\/location/, 'get', {
//     "data|10": [{
//         "key": "@increment",
//         "area": Random.region(),
//         "add|0-1000": 1,
//         "asymptomatic|0-1000": 1,
//         "now|0-1000": 1,
//         "total|0-1000": 1,
//         "cure|0-1000": 1,
//         "die|0-1000": 1,
//     }]
// })

// export default Mock;