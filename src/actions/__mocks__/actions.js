

export const fetch = jest.fn();

// export const fetchEuribor = (url) => {

//     return fetch(url)
//         .then(response => {

//             if (response.ok) {
//                 //Promise with json data    
//                 return response.json().dataset.data[1];;
//             }

//             throw new Error('Network response was not ok.');
  
//         });

// }

export const fetchEuribor = (url) => {

    return fetch(url)
        .then(response => {

            if (response.ok) {
                //Promise with json data    
                return response.json().then(euriborData => euriborData.dataset.data[0][1]);
            }

            throw new Error('Network response was not ok.');

        });

}


// export const fetchEuribor = url => {
//     return new Promise((resolve, reject) => {
//         process.nextTick(() => {
//             if (url && url.localeCompare('https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json?api_key=FfF1zN9ZYyTEitZzhEDJ') == 0) {
//                 resolve(-0.3299);
//             }
//             if (url && url.localeCompare('https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json') == 0) {
//                 resolve({ok: false});
//             } else {
//                 reject(new Error('Network Error'));
//             }
//         });
//  });
// }



// export const fetchEuribor = url => {
//     return new Promise((resolve, reject) => {
//         console.log('P');
//         process.nextTick(() => {
//             console.log('PP');
//                 resolve(-0.3299);
//         });
//  });
// }