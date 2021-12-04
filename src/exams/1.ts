import assert from 'power-assert';

/**
 * --- 问题描述 ---
 *
 * 算出两个数组的补集，数组只包含字符串和数字
 *
 * --- 说明 ---
 *
 * - 补集：如果 b 是 a 的子集，返回存在于 a 不存在于 b 的元素集合，反之返回空集合
 */

type TElement = string | number;

function findComplementarySet(a: TElement[], b: TElement[]): TElement[] {
    // write your code here ...
    return b.some((bitem) => !~a.indexOf(bitem))
        ? [] // b不是a的子集
        : a.filter((aitem) => !~b.indexOf(aitem)); // 返回补集
}

/*
 * --- 测试部分 ---
 */
export function doTest() {
    try {
        assert.deepEqual(findComplementarySet(['a', 6, 'b', 3], ['b']).sort(), [
            3,
            6,
            'a',
        ]);
        assert.deepEqual(findComplementarySet([1, 11, 111], [2]), []);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
