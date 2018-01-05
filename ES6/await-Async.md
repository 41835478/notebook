### ��ͼ��ʾ������Await and Async

**Ŀ¼**

[TOC]
## Introduction
>ES7�е�async/awaitʹ���첽���ø��ӷ��㡣�������ĳЩ�ط�ʹ�ô�����promise��callback�첽��ȡ���ݣ���async/await�ṹ��ʹ������ӵļ�ࡢ��ά���Ը��ѡ�
>��ƪ���»���ͼ��ʾ������Await and Async
>�������֮ǰ�����������һ��promise����Ȼ��������˽��promise����������

##Promises
>��javascript���У�promise��ʾ�Ƿ������첽ִ�еĳ�����������˽�Ļ���promise����Java��future����C#��Taskһ��
>ͨ����promise�������������I/O�����������ȡ�ļ����߷���http���󡣶�������ֹ�̵߳�ִ�У�����һ���첽��promise��Ȼ��promise����ʵ�ֵ�ʱ��ִ��then�еĻص�����������ص�����������һ��promise����ˣ�������ʽ����promise
>�����е����ӵ��У���װ������ request-promise�⣬������
```javascript
const rp = require('request-promise');
```
��������һ���򵥵�http get�����䷵��һ��promise
```javascript
const promise = rp('http://example.com/')
```
��һ��������
```javascript
console.log('Starting Execution');
const promise = rp('http://example.com/');
promise.then(result => console.log(result));
console.log("Can't know if promise has finished yet...");
```
�ڵ�2�д���һ��promise��Ȼ���ٵ�����׷��һ���ص���������Ϊpromise���첽�ģ��������������˵�4�У����ǲ�֪�����promise�Ƿ�ɹ������������δ���ÿ�εĽ��Ҳ������ͬ��ͨ�����κ�promise֮��Ĵ����ͬpromiseһ��ִ��
��promise���֮ǰ��û���κκ���ķ�������ֹ��ǰ��һϵ�в�������ͬ��java��Future.get��������ֹ��ǰ���̣߳�ֱ��Future��ɡ���javascript���У��ȴ�promise��ɱȽϼ��֣�ֻ��ͨ����then����ӻص������ķ�������������

>��ͼ������������

![](SimplePromiseExample.png)
ͨ��then��ӵĻص�����ֻ�е�promiseִ�гɹ���ʱ��Ż�ִ�У����promiseִ��ʧ�ܣ����磬��������ʧ�ܣ����ص������Ͳ���ִ�С�Ҫ����promise��������������ͨ����catch����ӻص���������������
```
rp('http://example.com/').
then(() => console.log('Success')).
catch(e => console.log(`Failed: ${e}`))
```
Ϊ�˲��Ե�Ŀ�ģ���������Ĵ���αPromise����Promise.resolve��ʾ�ɹ���Promise.reject��ʾʧ��
```
const success = Promise.resolve('Resolved');
// Will print "Successful result: Resolved"
success.
	then(result => console.log(`Successful result: ${result}`)).
    catch(e => console.log(`Failed with: ${e}`))
const fail = Promise.reject('Err');
// Will print "Failed with: Err"
fail.
    then(result => console.log(`Successful result: ${result}`)).
    catch(e => console.log(`Failed with: ${e}`))
```
## The Problem - Composing Promises
>������promise�򵥡�Ȼ��������Ҫ�ö��promise����ʵ�ָ��ӵ��첽�߼�����д����then��������������������ʧ��

>����Ҫ��������������
```
����һ��http���󣬵ȴ�����ɣ���ӡ���
������������http����
�����Ƕ����֮�󣬴�ӡ���
```
>�������С����ʾ��ν���������
```
// Make the first call
const call1Promise = rp('http://example.com/');
call1Promise.then(result1 => {
    // Executes after the first request has finished
    console.log(result1);
    const call2Promise = rp('http://example.com/');
    const call3Promise = rp('http://example.com/');
    return Promise.all([call2Promise, call3Promise]);
}).then(arr => {
    // Executes after both promises have finished
    console.log(arr[0]);
    console.log(arr[1]);
})
```
>����һ��http���󣬵����ɹ���ʱ��ȥִ�лص��������ڻص������У�Ϊ�����http���󴴽���������Promise��������promise��ִ����ɺ�ȥִ��һ���ص���������Ҫͨ��promise.allʵ�ֵ�һ��Promise�������promise��������ʱ������Ϊcallback�Ľ����һ��promise��������Ҫ��һ��then��ӡ���

>��ͼ������������

![](CombinedPromises.png)
>Ϊ��ôһ���򵥵����⣬��Ҫ������then�ص����������Ҳ��ò�����promise.allͬ����ǰ��promise�����Ҫִ�и����ͬ�������ʹ�������ô�죿���ַ�������������ĵ��õĺͻص�����

## Async Functions
>�첽�����Ƕ��巵��promise�����Ŀ�ݷ�ʽ

>�������������ȵ�
```
function f() {
    return Promise.resolve('TEST');
}
// asyncF is equivalent to f!
async function asyncF() {
    return 'TEST';
}
```
>ͬ�����׳��쳣���첽�����ͷ���reject��promise������ͬ
```
function f() {
    return Promise.reject('Error');
}
// asyncF is equivalent to f!
async function asyncF() {
    throw 'Error';
}
```

## Await
>������һ��promise������ͬ���ȴ�����ɣ�ֻ��ͨ��then�ص����ȴ�promise�������������ı��롣���򣬿������볢��������������Ϊ����promise�ͻص������ס�
>Ȼ����Ϊ��ͬ��promise�����ǲ��ò�����˴˵ȴ���Ҳ����һ���첽�������Եȴ���һ���첽��������ɡ�����javascript���������֪��һ�������Ƿ���promise������
>async�ؼ��֣�ÿ��async��������һ��promise������javascript����������promise��װasync������Ȼ���첽ִ�С�����������������ǵȴ�����promise����ɡ�
>await�ؼ���ֻ����asunc������ʹ�ã���������promise���첽�ȴ��������async����֮����promise����ôֻ����then��ʽִ�лص�����
```
async function f(){
    // response will evaluate as the resolved value of the promise
    const response = await rp('http://example.com/');
    console.log(response);
}
// We can't use await outside of async function.
// We need to use then callbacks ....
f().then(() => console.log('Finished'));
```
>�����������������
```
// Encapsulate the solution in an async function
async function solution() {
    // Wait for the first HTTP call and print the result
    console.log(await rp('http://example.com/'));
    // Spawn the HTTP calls without waiting for them - run them concurrently
    const call2Promise = rp('http://example.com/');  // Does not wait!
    const call3Promise = rp('http://example.com/');  // Does not wait!
    // After they are both spawn - wait for both of them
    const response2 = await call2Promise;
    const response3 = await call3Promise;
    console.log(response2);
    console.log(response3);
}
// Call the async function
solution().then(() => console.log('Finished'));
```
>������Ĵ���Ƭ���У�������һ��async������װ�������������������ֱ�ӵȴ�promise���Ӷ���������Ҫ�ٻص���������ǵ���async�������򵥵�����һ��promsie������������promise���߼�
>��ʵ���ڵ�һ�������У�û���첽/�ȴ�����promise���������С�����������£�������ͬ�������飨��7�У���ע�⣬���ǲ��õȵ���9-10�գ������ǿ��ִ��ֱ������promise����ɡ�����������֪��������promise���Ѿ�����ˣ�Promise.all(...).then(...))
�ײ��������൱��ǰһ�������Ĺ��̡�Ȼ����������׶���ֱ�ӡ�
>������ں�̨��async/await���ͳ�promise��then�ص�������Ҳ����promise���﷨�ƣ�ÿ�����ǵ���async�����涼�ᴴ��һ��promise��async��ʣ�µĲ����������then�ص�������

>����һ�������������
```
async function f() {
    console.log('Starting F');
    const result = await rp('http://example.com/');
    console.log(result);
}
```
>�������f()����������߼�����Ϊf()��async���Σ������������ĵ��ú�������ִ��

![](AsyncAwaitExample.png)
f()��������һ��promise��ͬʱ��ʣ��Ĳ��ַ�װ���ص������У��ⲿ�ֻ���promise����֮��ִ��

##Error Handling
>��֮ǰ�����ӵ��У�������promise��ȷִ�У����async�����з���ֵ�����һ��async���ڲ��׳��쳣�����ñ�׼��try/catch���
```
async function f() {
    try {
        const promiseResult = await Promise.reject('Error');
    } catch (e){
        console.log(e);
    }
}
```
���async�����������쳣��������ͨ��reject promise����һ��������������reject promise
```
async function f() {
    // Throws an exception
    const promiseResult = await Promise.reject('Error');
}
// Will print "Error"
f().
    then(() => console.log('Success')).
    catch(err => console.log(err))
async function g() {
    throw "Error";
}
// Will print "Error"
g().
    then(() => console.log('Success')).
    catch(err => console.log(err))
```
��������ṩ��һ�ּ��ķ�����ͨ����֪���쳣��������������ܾ��ĳ�ŵ��
##Discussion
>Async/await�ṩ��һ�ָ��Ӽ�෽ʽʵ��promise������һЩ����£�Async/await ���ܴ���promise�����磬����ͨ��������ȫ�����������async������Ͳ���ʹ��await��ֻ��ͨ��promise��ʽ
```
async function fAsync() {
    // actual return value is Promise.resolve(5)
    return 5;
}
// can't call "await fAsync()". Need to use then/catch
fAsync().then(r => console.log(`result is ${r}`));
```
��ͨ�����Խ��󲿷��첽�߼���װ��һ���򼸸��첽�����У��Ҵӷ��첽��������첽������������޶ȵؼ���������Ҫ��д��then / catch�ص���������

async / await�ṹ�����ڸ�����ʹ��promise���﷨�ǡ�ÿ���첽/�ȴ���������ü򵥵�promise����д�����գ�����һ�����ͼ������⡣

�е�ѧ��ָ�������ԺͲ�������������ġ�����Rob Pike����������������ǰ�����ӵĻ��⡣�����ǹ�����϶������̣���������̵�һ�������ϣ�һ�������������ǹ���ʵ��ͬʱִ�ж�����̡������ǹ���Ӧ�ó������ƺͽṹ���������ǹ���ʵ�ʵ�ִ�С�

��������һ�����߳�Ӧ�ó���Ϊ����Ӧ�ó��������̶߳��������Ĳ���ģ�͡���Щ�߳��ڿ����ں��ϵ�ӳ�䶨�����伶������ԡ�һ������ϵͳ�����ڵ�������������Ч�����У�����������������ǲ��еġ�
![](concurrent_vs_parallel.png)
�ʹ˶��ԣ�promise�������ǽ�һ������ֽ�Ϊ���еĲ���ģ�飬Ҳ���Բ��������С� ʵ�ʵ�JavaScriptִ���Ƿ���ȡ����ʵ�֡� ���磬Node Js�ǵ��̵߳ģ����һ��promise��CPU�󶨵ģ���Ͳ��ῴ��̫��Ĳ����ԡ� ���ǣ������ͨ����Nashorn�����Ķ�������Ĵ�������java�ֽ��룬��ô������������ܹ��ڲ�ͬ������ӳ��CPU�󶨵�promise������ʵ�ֲ����ԡ� ��ˣ����ҿ�����promise����������ʽ��ͨ��async/await��������һ��JavaScriptӦ�ó���Ĳ���ģ�͡�

