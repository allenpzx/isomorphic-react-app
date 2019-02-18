// test('two plus two is four', () => {
//     expect(2 + 2).toBe(4);
// });
// test('object assignment', () => {
//     const data = {
//         one: 1
//     };
//     data['two'] = 2;
//     expect(data).toEqual({
//         one: 1,
//         two: 2
//     });
// });
// test('adding positive numbers is not zero', () => {
//     for (let a = 1; a < 10; a++) {
//         for (let b = 1; b < 10; b++) {
//             expect(a + b).not.toBe(0);
//         }
//     }
// });
// test('null', () => {
//     const n = null;
//     expect(n).toBeNull();
//     expect(n).toBeDefined();
//     expect(n).not.toBeUndefined();
//     expect(n).not.toBeTruthy();
//     expect(n).toBeFalsy();
// });

// test('zero', () => {
//     const z = 0;
//     expect(z).not.toBeNull();
//     expect(z).toBeDefined();
//     expect(z).not.toBeUndefined();
//     expect(z).not.toBeTruthy();
//     expect(z).toBeFalsy();
// });

// test('two plus two', () => {
//     const value = 2 + 2;
//     expect(value).toBeGreaterThan(3);
//     expect(value).toBeGreaterThanOrEqual(3.5);
//     expect(value).toBeLessThan(5);
//     expect(value).toBeLessThanOrEqual(4.5);

//     // toBe and toEqual are equivalent for numbers
//     expect(value).toBe(4);
//     expect(value).toEqual(4);
// });

// test('adding floating point numbers', () => {
//     const value = 0.1 + 0.2;
//     expect(value).toBeCloseTo(0.3);
// });
// test('there is no I in team', () => {
//     expect('team').not.toMatch(/I/);
// });

// test('but there is a "stop" in Christoph', () => {
//     expect('Christoph').toMatch(/stop/);
// });
// const shoppingList = [
//     'diapers',
//     'kleenex',
//     'trash bags',
//     'paper towels',
//     'beer',
// ];

// test('the shopping list has beer on it', () => {
//     expect(shoppingList).toContain('beer');
// });

// function compileAndroidCode() {
//     throw new ConfigError('you are using the wrong JDK');
// }
// const fetchData = function (cb) {
//     setTimeout(() => {
//         cb && cb('peanut butter');
//     }, 2000)
// }
// test.only('the data is peanut butter', done => {
//     function callback(data) {
//         expect(data).toBe('peanut butter');
//         done();
//     }

//     fetchData(callback);
// });

it('test', function (){
    function forEach(items, callback) {
        for (let index = 0; index < items.length; index++) {
            callback(items[index]);
        }
    }
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);
    
    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);
    
    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    
    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    
    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);
})