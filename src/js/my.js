export default () => {
    console.log('this is module!');

    const obj = {
        a:1, b:2
    }

    const obj2 = {
        c:3
    }

    const obj3 = {...obj, ...obj2};

    console.log(obj3);
}
