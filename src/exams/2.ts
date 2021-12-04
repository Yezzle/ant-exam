import assert from 'power-assert';

/**
 * --- 问题描述 ---
 *
 * 实现一个函数生成器，接收一个原函数和一组 index，生成一个新函数
 * 调用新函数时，按照 index 数组中定义的顺序将参数传入原函数中
 *
 */

type TAnyFunction = (...args: any[]) => any;

function createRearFunc<T extends TAnyFunction>(func: T, indexes: number[]): T {
    // write your code here ...
    return function (...args: any[]) {
        // 建一个下标集映射
        const indexMap = args.reduce((res, item, i) => {
            res[indexes[i]] = item;
            return res;
        }, {});
        // 这里的index是正常顺序
        return func(...args.map((_: any, index: number) => indexMap[index]));
    };
}

/*
 * --- 测试部分 ---
 */
export function doTest() {
    try {
        const originalFunc = function (a: string, b: string, c: string) {
            return [a, b, c];
        };
        const f = createRearFunc(originalFunc, [2, 0, 1]);
        // 按照 [2, 0, 1] 定义的顺序
        // ['foo', 'bar', 'fiz'] 分别应该作为原函数的第 2/0/1 个参数传入
        assert.deepEqual(f('foo', 'bar', 'fiz'), ['bar', 'fiz', 'foo']);
        return true;
    } catch (err) {
        console.error('----', err);
        return false;
    }
}
