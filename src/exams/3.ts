import assert from 'power-assert';

/**
 * --- 问题描述 ---
 *
 * 给定一组文件路径，找出它们共同的的父级目录
 *
 * --- 说明 ---
 *
 * - 如果不存在共同的父级目录，返回 `null`
 */

function findParentDirectory(paths: string[]): string | null {
    // write your code here ...
    const parsePath = (path: string) => path.split('/').filter(Boolean);
    let parsedPaths = paths.map(parsePath);
    let res: string[] = [];
    for (let i = 0; i < Math.min(...parsedPaths.map((pp) => pp.length)); i++) {
        let pathItem = parsedPaths
            .map((pp) => pp[i])
            .reduce((p1, p2) => (p1 === p2 ? p2 : ''));
        if (pathItem) {
            res.push(pathItem);
        } else {
            break;
        }
    }
    return res.length ? '/' + res.join('/') : null;
}

/*
 * --- 测试部分 ---
 */
export function doTest() {
    try {
        assert.strictEqual(
            findParentDirectory(['/home/admin/vue', '/home/admin/react']),
            '/home/admin',
        );
        assert.strictEqual(
            findParentDirectory([
                '/home/admin/react/src',
                '/home/admin/react',
                '/home/admin/react/src/index.js',
            ]),
            '/home/admin/react',
        );
        assert.strictEqual(
            findParentDirectory(['/usr/bin', '/etc/config']),
            null,
        );
        return true;
    } catch (err) {
        console.error('3----', err);
        return false;
    }
}
