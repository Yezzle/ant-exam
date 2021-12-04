import assert from 'power-assert';

/**
 * --- 问题描述 ---
 *
 * 重新排列一个字符串，使得每个相邻字符都不同，列出所有情况
 *
 * --- 说明 ---
 *
 * - 字符串只包含小写字母或者数字
 */

function reorganize(str: string): string[] {
    // write your code here ...
    const map = str
        .split('')
        .reduce((r: { [k: string]: number }, c: string) => {
            if (r[c]) {
                r[c] += 1;
            } else {
                r[c] = 1;
            }
            return r;
        }, {});
    //  有了这个map之后做一个递归：
    //   function combine(prefix:string, leftCharInfo:object) : string[]
    //  prefix是前面满足条件的字符串， 根据剩下的char数量进行递归
    //  比如 prefix 最后一个是aba， leftChar = {a: 2, b: 1, c: 1, total: 8}
    //   那么返回长度为2的数组： ['abab', 'abac']
    const combine = (
        prefix: string,
        leftCharInfo: { [key: string]: number },
        total: number,
    ): string[] => {
        leftCharInfo = { ...leftCharInfo };
        const lastChar = prefix.slice(-1);
        // 结束条件
        if (prefix.length === total) return [prefix];

        let result: string[] = [];
        Object.keys(leftCharInfo).forEach((k) => {
            console.log('k: ', k, 'prefix:', prefix, lastChar, leftCharInfo);
            // 如果最后一个字符 和当前字符k不同，则存入数组，计数减一
            if (lastChar !== k && leftCharInfo[k] > 0) {
                let subRes = combine(
                    prefix + k,
                    { ...leftCharInfo, [k]: leftCharInfo[k] - 1 },
                    total,
                );
                result = result.concat(subRes);
            }
        });
        return result;
    };

    return combine('', map, str.length);
}

/*
 * --- 测试部分 ---
 */
export function doTest() {
    try {
        assert.deepStrictEqual(reorganize('aabb').sort(), ['abab', 'baba']);
        assert.deepStrictEqual(reorganize('aaabbbb').sort(), ['bababab']);
        assert.deepStrictEqual(reorganize('aabbbc').sort(), [
            'ababcb',
            'abcbab',
            'bababc',
            'babacb',
            'babcab',
            'babcba',
            'bacbab',
            'bcabab',
            'bcbaba',
            'cbabab',
        ]);
        assert.deepStrictEqual(reorganize('1bbbbb'), []);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
