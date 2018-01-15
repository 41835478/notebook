// 1��ÿ�����ʵ�����ĸ��д
const capitalizeEveryword=str=>str.replace(/\b[a-z]/g,char=>char.toUpperCase())
console.log(capitalizeEveryword('hello world'))
// 2������ƽ����
const average=arr=>arr.reduce((acc,val)=>acc+val,0)/arr.length
console.log(average([1,2,3]))
// 2.2���������
const arraySum=arr=>arr.reduce((acc,val)=>acc+val,0)
console.log(arraySum([1,2,3]))
// 3������ĸ��д
const capitalize=(str,lowerReset)=>str.slice(0,1).toUpperCase()+(lowerReset?str.slice(1).toLowerCase():str.slice(1))
console.log(capitalize('myName',true))
// 4�������ģ���ת֮��Ƚϣ�
const palindrome=str=>str.toLowerCase().replace(/[\W_]/g,'').split('').reverse().join('')===str.toLowerCase().replace(/[\W_]/g,'')
console.log(palindrome('taco cat'))
// 5������������ֵ���ֵĴ�����ԭ���ö����ֵ�Եķ�ʽ��
const countOcurrences=(arr,val)=>arr.reduce((a,v)=>v===val?a+1:a+0,0)
console.log(countOcurrences([1,1,2,3,1,2,1],1))
// 6����ȡ��ǰURL
const currentURL=()=>window.location.href;
console.log(currentURL())
// 7������֮��ľ��루ֱ������ϵ��
const distance=(x0,y0,x1,y1)=>Math.hypot(x1-x0,y1-y0)
console.log(distance(1,1,2,3))
// 8������֮������� includes
const difference=(arr,values)=>arr.filter(v=>!values.includes(v))
console.log(difference([1,2,3],[2,3]))
// 8.2������֮��Ĺ���ֵ
const similarity=(arr,values)=>arr.filter(v=>values.includes(v))
console.log(similarity([1,2,3],[2,3]))
// 9���ж�����ż��
const isEven=num=>Math.abs(num)%2===0
console.log(isEven(3))
// 10���׳�
const factorial=n=>n<=1?n:n*factorial(n-1)
console.log(factorial(4))
// 11���Ʋ��������������� acc�ǵ�ǰ����
const fibonacci=n=>Array(n).fill(0).reduce((acc,val,i)=>acc.concat(i>1?acc[i-1]+acc[i-2]:i),[])
console.log(fibonacci(5))
// 12�����������еķ�Ψһֵ
const unique=arr=>arr.filter(i=>arr.indexOf(i)===arr.lastIndexOf(i))
console.log(unique([1,3,5,7,3,1]))
// 13��Flatten���飨��ʽ�����飩
const flatten=arr=>arr.reduce((a,v)=>a.concat(v),[])
console.log(flatten([1,2,[3],4]))
// 14�������������Сֵ
const arrayMax=arr=>Math.max(...arr);
const arrayMin=arr=>Math.min(...arr);
console.log(arrayMax([9,7,1,3,5]))
console.log(arrayMin([9,7,1,3,5]))

// 15����ȡ����λ��
const getScrollPos=(el=window)=>({
  x:el.pageXOffset!==undefined?el.pageXOffset:el.scrollLeft,
  y:el.pageYOffset!==undefined?el.pageYOffset:el.scrollTop,
})
console.log(getScrollPos())
// 16�����Լ��(����Ǵ��)
const gcd=(x,y)=>!y?x:gcd(y,x%y);
console.log(gcd([5,15]))
// 17�����Թ��������ѵ�ʱ��
const timeTaken=(func,...args)=>{
  var t0=performance.now(),r=func(...args);
  console.log(performance.now()-t0)
  return r;
}
console.log(timeTaken(Math.pow,2,10))
// 18������������˳��
const randomOrder=arr=>arr.sort((a,b)=>Math.random()>0.5?-1:1)
console.log(randomOrder([1,2,3,4,5,6,7,8,9]))
// 19���ַ���ת
const reverseString=str=>[...str].reverse().join('')
console.log(reverseString('footbar English'))
// 20��RGBת��16���� padStart
const rgbTohex=(r,g,b)=>((r<<16)+(g<<8)+b).toString(16).padStart(6,'0')
console.log(rgbTohex(255,165,1))
//21������������
const scrollTotop=()=>{
  const c=document.documentElement.scrollTop||document.body.scrollTop
  if(c>0){
    window.requestAnimationFrame(scrollTotop)
    window.scrollTo(0,c-c/8);
  }
}
scrollTotop()
// 22���ַ���������ĸ˳������
const sortCharactarIntString=str=>str.split('').sort((a,b)=>a.localeCompare(b)).join('')
console.log(sortCharactarIntString('english'))
// 23��ɸ�������е�Ψһֵ
const uniques=arr=>[...new Set((arr))]
console.log(uniques([1,2,2,3,3,4,5,4]))
// 24��URL���� (������Ѷ�)
const getURLParameters = url =>
  url.match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
console.log(getURLParameters('https://www.baidu.com/s?tn=28035039_3_pg&rsv_idx=2&wd=�Ķ�ţ��&rsv_crq=6&bs=����ţ'))
