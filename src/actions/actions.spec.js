
jest.mock('./actions');
import { fetch, fetchEuribor } from './actions';


describe('fetchEuribor', () => {

    it(' returns Euribor from newtwork request ( asynchronous)', () => {
        fetch.mockImplementation(url => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    resolve({
                        ok: true,
                        json: () => {
                            return new Promise((resolve, reject) => {
                                process.nextTick(() => {
                                    resolve({
                                        dataset: {
                                            data: [
                                                [0, -0.3299]
                                            ]
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });

        expect.assertions(1);
        return expect(fetchEuribor('https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json?api_key=FfF1zN9ZYyTEitZzhEDJ')).resolves.toBe(-0.3299);

    });

    it(' rejects if response indicate not ok', () => {
        fetch.mockImplementation(url => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    resolve({
                        ok: false
                    });
                });
            });
        });

        expect.assertions(1);
        return expect(fetchEuribor('https://www.quandl.com/api/v3/datasets/BOE/IUQAERB3.json')).rejects.toEqual(new Error('Network response was not ok.'));

    });

    it(' rejects if fetch throws Error', () => {
        fetch.mockImplementation(url => {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    reject(new Error('Network Error'));
                });
            });
        });
        expect.assertions(1);
        return expect(fetchEuribor()).rejects.toEqual(new Error('Network Error'));

    });



    // return new Promise((resolve, reject) => {
    //                                 process.nextTick(() => resolve({
    //                                     dataset: {
    //                                         data: [0, -0.3299]
    //                                     }
    //                                 }));
    //                             });

    // it(' returns EuriborX from newtwork request ( asynchronous)', () => {


    //     const mockFetch = (res, rej) => {
    //         setTimeout(() => {
    //             res(-0.3299);
    //         }, 100);
    //     };

    //     //const pr= new Promise(mockFetch);
    //     //pr.then(x=> console.log(x));

    //     expect.assertions(1);

    //     //return expect(new Promise(mockFetch)).resolves.toBe(1);
    //     return expect(fetchEuriborX(() => new Promise(mockFetch), 'http:\\foo.com')).resolves.toBe(-0.3299);



    //     //const mockFetch = jest.fn();
    //     //mockFetch.mockReturnValue(new Promise( () =>{  console.log('DDD'); return 1;}));


    //     //const pr= new Promise( () => {console.log('PP');})(



    //     //mockFetch(1).then(()=> {done();});

    //     //return expect(mockFetch()).resolves.toBe(1); //.then(x => {console.log('x',x);});

    //     //expect(mockFetch.mock.calls.length).toBe(1);

    //     //return expect(fetchEuriborX(mockFetch,'http:\\foo.com')).resolves.toBe(-0.3299);



    // });

});