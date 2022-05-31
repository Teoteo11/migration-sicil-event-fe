export const useReduce = (array: any[]): any[] => array.reduce(
    (a, b, index, arr) => {
      let sameEmail = [];
      sameEmail = arr.filter( item => item.email === b.email);
      if (sameEmail.length > 1) {
        const test = sameEmail.find( item => item.status === 'PAID');
        sameEmail = [];
        if (test) {
          a.push(test);
        }
      } else {
        a.push(b);
      }
      return a;
    }, [] as any
  ); 