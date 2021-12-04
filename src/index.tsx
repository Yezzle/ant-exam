import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { doTest as doTest1 } from './exams/1';
import { doTest as doTest2 } from './exams/2';
import { doTest as doTest3 } from './exams/3';
import { doTest as doTest4 } from './exams/4';
import { doTest as doTest5 } from './exams/5';
import './styles.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([false, false, false, false, false]);
  async function runTests() {
    const results = await Promise.all([
      doTest1(),
      doTest2(),
      doTest3(),
      doTest4(),
      doTest5(),
    ]);
    setResults(results);
    setLoading(false);
  }
  useEffect(() => {
    runTests();
  }, []);
  return (
    <div className="App">
      <div>
        <h1>笔试流程</h1>
        <p>
          1. 请 <strong style={{ color: 'red' }}>Fork 到自己的账号</strong>{' '}
          下再开始答题
        </p>
        <p>2. 完成 exams/ 文件夹下的题目，每个文件内有一题</p>
        <p>3. 确认完成，或到两小时后，将 Fork 后的链接发给面试官</p>
        <p>4. 尽可能完成所有题目, 有疑问联系对应的面试官</p>
      </div>
      <div>
        <h1>注意事项</h1>
        <p>1. 所有题目用原生 JS 实现，不要借助三方类库</p>
        <p>2. 下面显示的运行结果（测试用例）仅供参考，你可以补充更多</p>
        <p>3. 写好必要的注释</p>
        <p>4. TypeScript 不是必选项，你可以写纯 JavaScript</p>
      </div>
      <div>
        <h1>运行结果</h1>
        {results.map((ret, i) => (
          <p key={i}>
            第 {i + 1} 题:{' '}
            {loading ? (
              '运行中'
            ) : ret ? (
              <strong style={{ color: 'green' }}>通过</strong>
            ) : (
              <strong style={{ color: 'red' }}>不通过</strong>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
render(<App />, rootElement);
