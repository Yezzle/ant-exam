import assert from 'power-assert';

/**
 * --- 问题描述 ---
 *
 * 给出一组异步任务方法，和允许同时执行的个数，实现一个方法，用于并发执行异步任务
 *
 * --- 说明 ---
 *
 * - 当有任务执行完毕后，自动补充任务，始终保持正在执行的任务有 `concurrency` 个
 * - 返回 { resolved: [], rejected: [] }
 *
 */

type TAsyncTask = () => Promise<unknown> | unknown;
// 任务线程， 检测有任务就继续执行
async function runThread(
    pool: TAsyncTask[],
    res: { resolved: Array<any>; rejected: Array<any> },
): Promise<any> {
    let task = pool.shift();
    const next = () => runThread(pool, res);
    if (task) {
        try {
            let response = await task();
            res.resolved.push(response);
            return next();
        } catch (error) {
            res.rejected.push(error);
            return next();
        }
    } else {
        return Promise.resolve();
    }
}

async function parallel(
    tasks: TAsyncTask[],
    concurrency: number,
): Promise<{ resolved: unknown[]; rejected: unknown[] }> {
    // write your code here ...
    let res = { resolved: [], rejected: [] };
    return Promise.all(
        new Array(concurrency).fill(runThread(tasks, res)) as Promise<any>[],
    ).then(() => {
        return res;
    });
}

/*
 * --- 测试部分 ---
 */
export async function doTest() {
    try {
        const tasks = [
            () => new Promise((resolve) => setTimeout(resolve, 1000)),
            () => Promise.resolve('foo'),
            () => fetch('https://codesandbox.io'),
            () => Promise.reject(new Error('tttttttttttttt')),
            () => 'bar',
            () =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src =
                        'https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*h7o9Q4g2KiUAAAAAAAAAAABkARQnAQ';
                    img.onload = resolve;
                    img.width = 0;
                    img.height = 0;
                    document.body.append(img);
                }),
        ];
        const { resolved, rejected } = await parallel(tasks, 2);
        assert.equal(resolved.length, 5);
        assert.equal(rejected.length, 1);
        return true;
    } catch (err) {
        console.error('4---', err);
        return false;
    }
}
